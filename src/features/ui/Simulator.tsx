import * as React from 'react';

import Building from '../model/Building';
import Elevator from '../model/Elevator';

const INITIAL_NUMBER_OF_FLOORS: number = 20;
const INITAL_NUMBER_OF_ELEVATORS: number = 2;

class Simulator extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            building: new Building(INITIAL_NUMBER_OF_FLOORS, INITAL_NUMBER_OF_ELEVATORS),
            inputValueNumberOfElevators: INITAL_NUMBER_OF_ELEVATORS,
            inputValueNumberOfFloors: INITIAL_NUMBER_OF_FLOORS
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createNewBuilding = this.createNewBuilding.bind(this);
    }

    public handleInputChange(event: any) {
        const name: string = event.target.name;
        this.setState({ ...this.state, [name]: event.target.value });
    }

    public createNewBuilding() {
        this.setState({ ...this.state, building: new Building(this.state.inputValueNumberOfFloors, this.state.inputValueNumberOfElevators) });
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
                                {floors.map(floorNumber =>
                                    <tr key={floorNumber}>
                                        {elevators.map((elevator, indexElevator) => <td key={floorNumber + '-' + indexElevator}><button>{'F' + floorNumber + ' E ' + indexElevator}</button></td>)}
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
