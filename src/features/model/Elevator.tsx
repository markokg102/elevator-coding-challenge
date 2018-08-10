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

    constructor() {
        this.elevatorOccupationState = ElevatorOccupationState.Unoccupied;
        this.currentFloor = 0;
        this.elevatorServiceState = ElevatorServiceState.Serviced
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

}

export default Elevator;
