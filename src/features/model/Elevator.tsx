import Request from './Request'

export enum ElevatorOccupationState {
    Unoccupied  = 1,
    Occupied,
}

export enum ElevatorServiceState {
    Serviced  = 1,
    NotServiced,
}


class Elevator {

    public elevatorOccupationState: ElevatorOccupationState = ElevatorOccupationState.Unoccupied;
    public currentFloor: number;
    public elevatorServiceState: ElevatorServiceState;
    public assignedRequestToElevator: Request;
    private numberOfTrips: number;

    constructor() {
        this.elevatorOccupationState = ElevatorOccupationState.Unoccupied;
        this.currentFloor = 0;
        this.elevatorServiceState = ElevatorServiceState.Serviced;
        this.numberOfTrips = 0;
    }

    public changeElevatorCurrentFloor(newCurrentFloorParam: number) {
        this.currentFloor = newCurrentFloorParam;
    }

    public changeElevatorStateToOccupied() {
        this.elevatorOccupationState = ElevatorOccupationState.Occupied
    }

    public changeElevatorStateToUnoccupied() {
        this.elevatorOccupationState = ElevatorOccupationState.Unoccupied
    }
    
    public changeElevatorServiceStateToServiced() {
        this.elevatorServiceState = ElevatorServiceState.Serviced
    }

    public changeElevatorServiceStateToNotServiced() {
        this.elevatorServiceState = ElevatorServiceState.NotServiced
    }

    public moveElevatorUpForOneFloor() {
        this.currentFloor++;
    }

    public moveElevatorDownForOneFloor() {
       this.currentFloor--; 
    }

    public assignRequestToElevator(requestParam: Request) {
        this.assignedRequestToElevator = requestParam;
        this.numberOfTrips++;
        if(this.numberOfTrips === 100) {
            this.changeElevatorServiceStateToNotServiced();
        } 
    }


}

export default Elevator;
