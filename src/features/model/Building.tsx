import Request from './Request';

class Building {

    public ammountOfFloors: number;
    public ammountOfElevators: number;

    private queueOfRequests: Request[];

    constructor(ammountOfFloorsParam: number, ammountOfElevatorsParam: number) {
        this.ammountOfFloors = ammountOfFloorsParam;
        this.ammountOfElevators = ammountOfElevatorsParam;
        this.queueOfRequests = [];
    }

    public newRequest(request: Request) {
        this.queueOfRequests.push(request);
    }

    public removeOldestDoneRequestAtBegining() {
        this.queueOfRequests.shift();
    }

}

export default Building;
