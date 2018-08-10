export enum RequestType {
    RequestForElevator = 1,
    RequestDestination,
}

class Request {

    public requestedFloor: number;
    public requestType: RequestType;

    constructor(requestedFloorParam: number, requestTypeParam: RequestType) {
        this.requestedFloor = requestedFloorParam;
        this.requestType = requestTypeParam;
    }

}
 
export default Request;
