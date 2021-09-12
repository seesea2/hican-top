interface BusArrivalReturn {
  "odata.metadata": string;
  BusStopCode: string;
  Services: Service[];
}

interface Service {
  ServiceNo: string;
  Operator: string;
  NextBus: NextBusData;
  NextBus2: NextBusData;
  NextBus3: NextBusData;
}

interface NextBusData {
  OriginCode: string;
  DestinationCode: string;
  EstimatedArrival: string;
  Latitude: string;
  Longitude: string;
  VisitNumber: string;
  Load: LoadType;
  Feature: FeatureType;
  Type: VehicleType;
}

enum LoadType {
  SEA = 0, // seats available
  SDA, // standing available
  LSD, // limited standing
}

enum FeatureType {
  WAB = 0, // wheel-chair accessible
}

enum VehicleType {
  SD, // single deck
  DD, // double deck
  BD, // bendy
}

export {
  BusArrivalReturn,
  FeatureType,
  LoadType,
  NextBusData,
  Service,
  VehicleType,
};
