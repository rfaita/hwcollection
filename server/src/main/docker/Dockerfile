FROM openjdk:8-jre-alpine

ARG JAR_FILE
ARG UTIL_DIR
ENV JAVA_OPTS -Xmx512m -Xms256m

RUN addgroup -S javauser && adduser -S javauser -G javauser
WORKDIR /home/javauser

ADD ${UTIL_DIR}entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ADD ${JAR_FILE} app.jar

USER javauser

ENTRYPOINT ["/home/javauser/entrypoint.sh"]