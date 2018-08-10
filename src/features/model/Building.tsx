import Elevator, { ElevatorOccupationState, ElevatorServiceState } from './Elevator';
import Request from './Request';

/**
 * 
 * This is central class or model of building with floors and elevators.
 * Also there is implemented logic for executiong user requests.
 * 
 */
class Building {

    private ammountOfFloors: number;
    private ammountOfElevators: number;

    private queueOfRequests: Request[];

    private elevators: Elevator[];

    constructor(ammountOfFloorsParam: number, ammountOfElevatorsParam: number) {

        this.ammountOfFloors = ammountOfFloorsParam;
        this.ammountOfElevators = ammountOfElevatorsParam;
        this.queueOfRequests = [];
        this.elevators = [];

        for (let i = 0; i < this.ammountOfElevators; i++) {
            this.elevators.push(new Elevator())
        }

    }

    public newRequest(request: Request) {
        this.queueOfRequests.push(request);
    }

    public removeOldestDoneRequestAtBegining() {
        this.queueOfRequests.shift();
    }

    public addElevatorIntoBuilding(elevatorParam: Elevator) {
        this.elevators.push(elevatorParam);
    }

    public getAmmountOfFloors(): number {
        return this.ammountOfFloors;
    }

    public getAmmountOfElevators(): number {
        return this.ammountOfElevators;
    }

    public getElevators(): Elevator[] {
        return this.elevators;
    }

    /**
     * findClosestUnocupiedElevator method finds by request nearest free eelevator.
     * 
     * 
     */
    public findClosestUnocupiedElevator(requestParam: Request) {
        let closestUnocupiedElevator: Elevator | null = null;
        let elevatorDistanceFromRequest: number = this.ammountOfFloors + 1;

        this.elevators.forEach(elevator => {
            if (elevator.elevatorOccupationState === ElevatorOccupationState.Unoccupied && elevator.elevatorServiceState === ElevatorServiceState.Serviced) {
                if (elevatorDistanceFromRequest > Math.abs(requestParam.requestedFloor - elevator.currentFloor)) {
                    elevatorDistanceFromRequest = Math.abs(requestParam.requestedFloor - elevator.currentFloor);
                    closestUnocupiedElevator = elevator;
                }
            }
        });

        return closestUnocupiedElevator;


    }

    /**
     * This is central methodn for driving elevators. Method at begining use earliest request and then tries to find nearest elevator to assign request
     * by calling findClosestUnocupiedElevator, after that this method moves for one step every elevator that is occupied with assigned request.
     * Elvator cannot use request if is ocupied or is not serviced.
     * 
     */
    public executeRequests() {

        if (this.queueOfRequests.length > 0) {
            const closestUnocupiedElevator: Elevator | null = this.findClosestUnocupiedElevator(this.queueOfRequests[0]);

            if (closestUnocupiedElevator) {
                const closestUnocupiedElevatorFounded: Elevator = closestUnocupiedElevator;
                closestUnocupiedElevatorFounded.assignRequestToElevator(this.queueOfRequests[0]);
                closestUnocupiedElevatorFounded.changeElevatorStateToOccupied();
                this.queueOfRequests.shift();
            }
        }

        this.elevators.forEach(elevator => {
            if(elevator.assignedRequestToElevator && elevator.elevatorOccupationState === ElevatorOccupationState.Occupied) {
                const distanceToTheRequest = elevator.currentFloor - elevator.assignedRequestToElevator.requestedFloor;
                if(Math.abs(distanceToTheRequest) > 0) {
                    if(distanceToTheRequest > 0) {
                        elevator.moveElevatorDownForOneFloor();
                    } else {
                        elevator.moveElevatorUpForOneFloor();
                    }
                } else {
                    elevator.changeElevatorStateToUnoccupied();
                }
            }
        });


    }

}

export default Building;
