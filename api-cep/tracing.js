 
const {
	BasicTracerProvider,
	SimpleSpanProcessor,
} = require("@opentelemetry/tracing");
const { CollectorTraceExporter } =  require('@opentelemetry/exporter-collector-grpc');
require('dotenv').config();
const { Resource } = require("@opentelemetry/resources");
const {
	SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
 
const opentelemetry = require("@opentelemetry/sdk-node");
const {
	getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const exporter = new CollectorTraceExporter({serviceName: 'basic-service',}); 
const provider = new BasicTracerProvider({
	resource: new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: "service-a",
	}),
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();
const sdk = new opentelemetry.NodeSDK({
	traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
	instrumentations: [getNodeAutoInstrumentations()],
});
 
sdk.start();