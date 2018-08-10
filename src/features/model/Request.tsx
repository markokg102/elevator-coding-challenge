/**
 * Simple class to model request for elevator
 */
class Request {

    public requestedFloor: number;
    
    constructor(requestedFloorParam: number) {
        this.requestedFloor = requestedFloorParam;
    }

}
 
export default Request;
