import Elevator from './Elevator';
import Request from './Request';

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

    public getElevators():  Elevator[] {
        return this.elevators;
    }

}

export default Building;
