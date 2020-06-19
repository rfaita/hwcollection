const fs = require('graceful-fs');

const Crawler = require('crawler');

const crawler = new Crawler({
    maxConnections: 100
});

const { countryMap, colDataMap, baseUrl } = require('./consts.js');
const base64Encode = require('./base64.js');

function saveObjAsFile(obj) {
    const data = JSON.stringify(obj);
    fs.writeFileSync('database.json', data);
}

function normalizeCountry(country) {
    if (!!country) {
        for (let index in countryMap) {
            for (let countryMapping of countryMap[index]) {
                if (country.toLowerCase().indexOf(countryMapping) > -1) {
                    return index;
                }
            }
        }
    }
    return 'Malaysia';
}

function loadImage(id, url, ext) {
    return new Promise((resolve, reject) => {
        crawler.queue([{
            uri: url,
            jQuery: false,
            encoding: null,
            callback: (error, res, done) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`PHOTO EXTRACTED ${id}: ${url}`);

                    fs.writeFileSync(`./images/${id}${ext}`, res.body);
                    resolve(true);                    
                }
                done();
            }
        }]);
    });
}


function loadUrl(url) {
    return new Promise((resolve, reject) => {
        crawler.queue([{
            uri: url,
            callback: (error, res, done) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(res.$);
                }
                done();
            }
        }]);
    });
}

async function extractCar(car) {

    let carUrl;

    if (car.indexOf('http') > -1) {
        carUrl = car;
    } else {
        carUrl = baseUrl + car;
    }

    const $ = await loadUrl(carUrl);

    const carName = $('.page-header__title').text();

    const tables = $('.wikitable').toArray();

    let ret = []

    for (let indexTable = 0; indexTable < tables.length; indexTable++) {
        const table = $(tables[indexTable]);

        const headers = table.find('th').toArray();
        let colPosition = [];
        let position = 0;
        for (let indexHeader = 0; indexHeader < headers.length; indexHeader++) {
            colPosition[$(headers[indexHeader]).text().replace(/\n|\s/g, '')] = position++;
        }


        ret = [...ret, ...table.find('tr').toArray()]
            .map(tr => {
                tr = $(tr);

                const obj = { name: carName };
                for (let indexCol in colPosition) {


                    if (!!indexCol && !!colDataMap[indexCol] && colDataMap[indexCol] === 'photo') {

                        obj[colDataMap[indexCol]] = $(tr.find('td').get(colPosition[indexCol])).html();
                    } else {
                        obj[colDataMap[indexCol]] = $(tr.find('td').get(colPosition[indexCol])).text().replace(/^\s|\s$|\n/g, '');
                    }
                }

                if (!!obj.country) {
                    obj.country = normalizeCountry(obj.country);
                } else {
                    obj.country = 'Malaysia';
                }

                if (!!obj.baseColorType) {
                    if (obj.baseColorType.indexOf('/') > -1) {
                        obj.baseColorType = obj.baseColorType.split('/');
                        for (let indexBaseColorType in obj.baseColorType) {
                            obj.baseColorType[indexBaseColorType] = obj.baseColorType[indexBaseColorType].replace(/^\s|\s$/g, '');
                        }
                    } else {
                        obj.baseColorType = [obj.baseColorType];
                    }
                } else {
                    obj.baseColorType = [];
                }

                if (!!obj.wheelType) {
                    if (/alt="([^"]+)"/.exec(obj.wheelType)) {
                        obj.wheelType = /alt="([^"]+)"/.exec(obj.wheelType)[1];
                        if (/px-(.+)&amp/.exec(obj.wheelType)) {
                            obj.wheelType = /px-(.+)&amp/.exec(obj.wheelType)[1];
                        }
                        if (/px-(.+)\s-/.exec(obj.wheelType)) {
                            obj.wheelType = /px-(.+)\s-/.exec(obj.wheelType)[1];
                        }
                        if (/px-(.+)\s\d+x/.exec(obj.wheelType)) {
                            obj.wheelType = /px-(.+)\s\d+x/.exec(obj.wheelType)[1];
                        }
                        if (/px-(.+)/.exec(obj.wheelType)) {
                            obj.wheelType = /px-(.+)/.exec(obj.wheelType)[1];
                        }
                    }
                }

                if (!!obj.color) {
                    if (obj.color.indexOf('/') > -1) {
                        obj.color = obj.color.split('/');
                        for (let indexColor in obj.color) {
                            obj.color[indexColor] = obj.color[indexColor].replace(/^\s|\s$/g, '');
                        }
                    } else {
                        obj.color = [obj.color];
                    }
                } else {
                    obj.color = [];
                }

                if (!!obj.number) {
                    obj.number = obj.number.replace('/\s/g', '').replace('-', '');

                    if (/(\d+)\s?\/\s?(\d+)/.exec(obj.number)) {
                        obj.numberTotal = /(\d+)\s?\/\s?(\d+)/.exec(obj.number)[2];
                        obj.number = /(\d+)\s?\/\s?(\d+)/.exec(obj.number)[1];

                    }
                }

                if (!!obj.series) {
                    if (/(\d+)\s?\/\s?(\d+).*$/.exec(obj.series)) {
                        obj.seriesNumber = /(\d+)\s?\/\s?(\d+).*$/.exec(obj.series)[1];
                        obj.seriesTotalNumber = /(\d+)\s?\/\s?(\d+).*$/.exec(obj.series)[2];
                    }
                    obj.series = obj.series.replace(/(\d+)\s?\/\s?(\d+).*$/, '').replace(/^\s*|\s*$/g, '');
                }

                if (!!obj.photo) {
                    if (/img\ssrc="(http[^"]*")/.exec(obj.photo)) {
                        obj.photo = /img\ssrc="(http[^"]*)"/.exec(obj.photo)[1];
                    }
                    if (obj.photo.indexOf('http') !== 0 || obj.photo.indexOf('Image_Not_Available') > -1) {
                        obj.photo = '';
                    }

                } else {
                    obj.photo = '';
                }

                obj.photo = obj.photo.replace(/\t|\s/g, '').replace(/\/\d+\?cb/, '/480?cb');;

                obj.id = (obj.name + obj.year + obj.series + obj.key + obj.wheelType).replace(/[^\w|\s]/g, '');

                return obj;

            }).filter(row => row.number || row.series || row.year);
    }

    console.debug(`CAR EXTRACTED: ${car}`);

    return ret;

}


async function extractCars(year) {

    const $ = await loadUrl(baseUrl + year);

    console.log(`EXTRACTING CARS OF YEAR : ${year}`);

    let ret = [];

    $('.wikitable').toArray().map(table => {
        const t = $(table)
        let index = -1;
        let ths = t.find('th').toArray();

        if (ths.length <= 0) {
            ths = t.find('tr:nth-child(1) td').toArray();
        }

        for (let i = 0; i < ths.length; i++) {
            const name = $(ths[i]).text().replace(/\n/g, '').toUpperCase();
            if (name.indexOf('CAR NAME') > -1 || name.indexOf('CASTING') > -1
                || name.indexOf('MODEL NAME') > -1 || name === 'NAME') {
                index = i;
            }
        }

        if (index > -1) {
            ret = [...ret, ...t.find(`tr td:nth-child(${index + 1}) a`).toArray().map(a => $(a).attr('href')).filter(href => !!href)];
        }

    })
    ret = [...new Set([...ret])];

    console.table(ret);

    return ret;

}

async function extractYears() {
    const initialUrl = '/wiki/Hot_Wheels';
    const $ = await loadUrl(baseUrl + initialUrl);

    console.log('EXTRACTING YEARS');
    return $('i').next().next().find('a').toArray().map(a => $(a).attr('href'));
}

async function extractData() {

    const iniDate = new Date().getTime();

    const years = await extractYears();

    const carsPromisses = [];
    for (let year of years) {
        carsPromisses.push(extractCars(year));
    }

    const carsByYearResult = await Promise.all(carsPromisses);

    const extractedCars = []
    const carPromisses = [];
    for (let cars of carsByYearResult) {
        for (let car of cars) {

            if (extractedCars.indexOf(car) <= -1) {
                console.log(`NEXT CAR: ${car}`);
                extractedCars.push(car);
                carPromisses.push(extractCar(car));

            } else {
                console.debug(`CAR IGNORED, ALREADY PARSED: ${car}`);
            }

        }
    }

    const carsResult = await Promise.all(carPromisses);

    let finalResult = [];
    for (let carsObj of carsResult) {
        for (let carObj of carsObj) {
            finalResult.push(carObj);
        }
    }

    finalResult = [...new Set([...finalResult])];

    const photosPromisses = [];
    for (let car of finalResult) {
        if (!!car.photo) {
            let ext = '.gif';
            if (car.photo.toUpperCase().indexOf('.JPG') > -1) {
                ext = '.jpg';
            } else if (car.photo.toUpperCase().indexOf('.PNG') > -1) {
                ext = '.png';
            }
            photosPromisses.push(loadImage(car.id, car.photo, ext));
            car.photo = ext;
        }

    }
    await Promise.all(photosPromisses);

    saveObjAsFile(finalResult);

    console.log(`parser finish now, with : ${(new Date().getTime() - iniDate) / 1000} seconds`);
    console.log(`cars parsed: ${finalResult.length}`);

}

extractData();