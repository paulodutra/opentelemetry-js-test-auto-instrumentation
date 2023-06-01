'use strict';

const { MeterProvider } = require('@opentelemetry/metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

const prometheusPort = PrometheusExporter.DEFAULT_OPTIONS.port
const prometheusEndpoint = PrometheusExporter.DEFAULT_OPTIONS.endpoint

const exporter = new PrometheusExporter(
  {
    startServer: true,
  },
  () => {
    console.log(
      `prometheus scrape endpoint: http://localhost:${prometheusPort}${prometheusEndpoint}`,
    );
  },
);

const meter = new MeterProvider({
  exporter,
  interval: 1000,
}).getMeter('your-meter-name');

const requestCount = meter.createCounter("requests", {
  description: "Count all incoming requests"
});
const boundIntruments = new Map ();

module.exports.countAllRequests = () => {
    return (req, res, next) => {
        if (!boundIntruments.has(req.path)) {
            const labels = {route: req.path };
            const boundConter = requestCount.bind(labels);
            boundIntruments.set(req.path, boundConter);
        }
        boundIntruments.get(req.path).add(1);
        next();
    };
};


