## OpenTelemetry tracing test 

This project is a clone of the repository: https://github.com/kubowania/opentelemetry-tracing

The project uses opentelemetry-js in version 0.16.0 and following the instructions on this link: https://github.com/open-telemetry/opentelemetry-js/tree/v0.16.0/getting-started

1. To running application, first you need to create the zipkin container using the docker tools:

```
docker run -d -p 9411:9411 openzipkin/zipkin --name zipkin
```
2. After you did the first step, install dependencies of the project:

```
npm i

```

3. After you did the second step, you need run the app, for it, using the terminal and execute the command bellow:

```
npm start

```

4. then visit localhost:8080/ and localhost:8080/date

Now view the tracing data in zipkin : http://localhost:9411/zipkin/