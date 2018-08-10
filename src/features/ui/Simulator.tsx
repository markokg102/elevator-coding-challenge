import * as React from 'react';
import Building from '../model/Building';
import Elevator from '../model/Elevator';
import Request from '../model/Request';

const INITIAL_NUMBER_OF_FLOORS: number = 20;
const INITAL_NUMBER_OF_ELEVATORS: number = 2;

/**
 * 
 * Simulator is basic react component for creating new Building, and for showing current model state.
 * Also this component has timer for driving process by calling driveSimulator which calls executeRequests on model.
 * 
 */
class Simulator extends React.Component<any, any> {

    private timerID: any;

    constructor(props: any) {
        super(props);
        this.state = {
            building: new Building(INITIAL_NUMBER_OF_FLOORS, INITAL_NUMBER_OF_ELEVATORS),
            inputValueNumberOfElevators: INITAL_NUMBER_OF_ELEVATORS,
            inputValueNumberOfFloors: INITIAL_NUMBER_OF_FLOORS
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createNewBuilding = this.createNewBuilding.bind(this);
        this.driveSimulator = this.driveSimulator.bind(this);
        this.requestElevator = this.requestElevator.bind(this);
    }

    public handleInputChange(event: any) {
        const name: string = event.target.name;

        if(event.target.value < 2){
            return;
        }

        this.setState({ ...this.state, [name]: event.target.value });
    }

    public createNewBuilding() {
        this.setState({ ...this.state, building: new Building(this.state.inputValueNumberOfFloors, this.state.inputValueNumberOfElevators) });
    }

    public componentDidMount() {
        this.timerID = setInterval(
            () => this.driveSimulator(),
            1000
        );
    }

    public componentWillUnmount() {
        clearInterval(this.timerID);
    }

    public driveSimulator() {
        const building: Building = Object.create(this.state.building);
        building.executeRequests();
        this.setState({
            ...this.state,
            building
        });
    }

    public requestElevator(event: any) {
        const building: Building = Object.create(this.state.building);

        building.newRequest(new Request(Number(event.target.name)));

        this.setState({
            ...this.state,
            building
        });
    }

    public render() {
        const building: Building = this.state.building;
        const elevators: Elevator[] = building.getElevators();

        const floors: number[] = [];
        for (let i = 0; i <= building.getAmmountOfFloors(); i++) {
            floors.push(i);
        }

        return (
            <div>
                <div>
                    Create new building with No. of floors:
                    <input type="number" name="inputValueNumberOfFloors" value={this.state.inputValueNumberOfFloors} onChange={this.handleInputChange} />
                    and number of elevators
                    <input type="number" name="inputValueNumberOfElevators" value={this.state.inputValueNumberOfElevators} onChange={this.handleInputChange} />
                    <button onClick={this.createNewBuilding}>Create new building</button>
                </div>
                {building &&
                    <div>
                        <div>Building with: {building.getAmmountOfFloors()} floors and {building.getAmmountOfElevators()} elevators.</div>
                        <table>
                            <thead>
                                <tr>
                                    {elevators.map((elevator, index) => <th key={index}>{'Elevator ' + (index + 1)}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {floors.reverse().map(floorNumber =>
                                    <tr key={floorNumber}>
                                        {elevators.map((elevator, indexElevator) =>
                                            <td key={floorNumber + '-' + indexElevator}>
                                                <span style={{ backgroundColor: elevator.currentFloor === floorNumber ? 'green' : 'white' }}>{'F' + floorNumber + ' E ' + indexElevator}</span>
                                            </td>)}
                                        <td>
                                            <button name={floorNumber + ''} onClick={this.requestElevator}>Request elevator</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

export default Simulator;
