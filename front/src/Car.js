import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Tooltip from '@material-ui/core/Tooltip';
import useFavoriteCar from './hooks/useFavoriteCar';
import useCollectCar from './hooks/useCollectCar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 240,
  },
  key: {
    top: 7,
    left: 7,
    position: 'absolute',
    height: 20
  },
  country: {
    width: 32,
    height: 32,
    top: 7,
    right: 7,
    position: 'absolute'
  },
  floatRight: {
    float: 'right'
  },
  name: {
    float: 'left'
  },
  number: {
    height: 18,
    top: 215,
    right: 7,
    position: 'absolute',
    fontSize: 10
  },
  year: {
    height: 18,
    top: 215,
    left: 7,
    position: 'absolute',
    fontSize: 10
  },
  series: {
    float: 'left',
    fontWeight: 'bold'
  },
  seriesNumber: {
    float: 'left',
    marginLeft: 5,
    fontSize: 10
  },
  clearBoth: {
    clear: 'both'
  },
  marginLeftAuto: {
    marginLeft: 'auto'
  },
  bold: {
    fontWeight: 'bold'
  },
  body: {
    height: 200,
    overflowY: 'auto'
  }
});

const Car = (props) => {

  const classes = useStyles();

  const [favorited, setFavorited] = useState({ carId: props.car.id, favorited: props.car.stats?.favoriteds?.indexOf(props.userId) > -1 });
  const [collected, setCollected] = useState({ carId: props.car.id, collected: props.car.stats?.collections?.indexOf(props.userId) > -1 });

  const { loadingFavorite, errorFavorite } = useFavoriteCar(favorited);
  const { loadingCollection, errorCollection } = useCollectCar(collected);

  function favorite() {

    if (!props.car.stats) {
      props.car.stats = {
        collections: [],
        favoriteds: []
      };
    }


    if (!favorited.favorited) {
      props.car.stats.favoriteds = [...props.car.stats.favoriteds, props.userId];
    } else {
      props.car.stats.favoriteds = props.car.stats.favoriteds.filter(item => item !== props.userId)
    }
    setFavorited(prev => { return { ...prev, favorited: !prev.favorited } });
  }

  function collect() {

    if (!props.car.stats) {
      props.car.stats = {
        collections: [],
        favoriteds: []
      };
    }

    if (!collected.collected) {
      props.car.stats.collections = [...props.car.stats.collections, props.userId];
    } else {
      props.car.stats.collections = props.car.stats.collections.filter(item => item !== props.userId)
    }
    setCollected(prev => { return { ...prev, collected: !prev.collected } });

  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {!!props.car.photo ?
          <CardMedia
            className={classes.media}
            image={props.car.photo}
            title={props.car.name}
          /> :
          <CardMedia
            className={classes.media}
            image={"imgs/default_car.png"}
            title={props.car.name}
          />}
        {!!props.car.key && <Chip label={props.car.key} className={classes.key} color="primary"></Chip>}
        {!!props.car.year &&
          <Link to={`/search?q=${props.car.year}`}><Chip label={props.car.year} className={classes.year} color="primary"></Chip></Link>}
        {!!props.car.number ? !!props.car.numberTotal ?
          <Chip label={`${props.car.number} / ${props.car.numberTotal}`} className={classes.number} color="primary"></Chip> :
          <Chip label={props.car.number} className={classes.number} color="primary"></Chip> : ''}
        <Tooltip title={props.car.country}>
          <img alt="country" className={classes.country} src={`imgs/${props.car.country?.toLowerCase()}.png`} />
        </Tooltip>
      </CardActionArea>
      <CardContent className={classes.body}>
        <Link to={`/search?q=${props.car.name}`}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
            {props.car.name}
          </Typography>
        </Link>

        <div className={classes.clearBoth}>
          <Link to={`/search?q=${props.car.series}`}>
            <Typography variant="subtitle1" color="textSecondary" className={classes.series}>
              {props.car.series}
            </Typography>
            {!!props.car.seriesNumber &&
              <Typography variant="subtitle1" color="textSecondary" className={classes.seriesNumber}>
                {props.car.seriesNumber} / {props.car.seriesTotalNumber}
              </Typography>}
          </Link>
        </div>
        <div className={classes.clearBoth}>
          {!!props.car.color &&
            <Typography variant="body2" color="textSecondary" component="div">
              Color: <Typography variant="body2" color="textPrimary" component="span">{props.car.color}</Typography>
            </Typography>}
          {!!props.car.baseColorType &&
            <Typography variant="body2" color="textSecondary" component="div">
              Base Color / Type: <Typography variant="body2" color="textPrimary" component="span">{props.car.baseColorType}</Typography>
            </Typography>}
          {!!props.car.wheelType &&
            <Typography variant="body2" color="textSecondary" component="div">
              Wheel Type: <Typography variant="body2" color="textPrimary" component="span">{props.car.wheelType}</Typography>
            </Typography>}
          {!!props.car.tampo &&
            <Typography variant="body2" color="textSecondary" component="div">
              Tampo: <Typography variant="body2" color="textPrimary" component="span">{props.car.tampo}</Typography>
            </Typography>}
        </div>
      </CardContent>


      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" color="primary" onClick={() => { favorite() }}>
          {favorited.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <span>{props.car.stats?.favoriteds?.length}</span>
        <IconButton aria-label="add to collection" color="primary" onClick={() => { collect() }}>
          {collected.collected ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
        <span>{props.car.stats?.collections?.length}</span>
        <IconButton aria-label="share" color="primary">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="show more" color="primary" className={classes.marginLeftAuto}>
          <MoreHorizIcon />
        </IconButton>
      </CardActions>

    </Card>
  );

}

export default Car;