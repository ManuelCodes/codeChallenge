import React from 'react';
import _ from 'lodash'
import { fetchBuildings } from '../actions';
import { connect } from 'react-redux';
import '../style.css';



class Home extends React.Component {

    componentDidMount() {
        this.props.fetchBuildings();
    }

    renderNames(zone) {
        const {items}         = this.props.buildings.buildingList.data;
        const sortedZones     =  _.orderBy(items, ['buildingzone'],['asc']);
        const groupedZones    =  _.mapValues(_.groupBy(sortedZones, 'buildingzone' ),
            clist => clist.map(sortedZone => _.omit(sortedZone, 'buildingzone'))
        );
        const sortedBuildings = _.orderBy(groupedZones[zone], ['buildingname'], ['asc']);
        return sortedBuildings.map( (item, index) => {
            if(item.black === 0) {
                return (
                    <div key={item.buildingname}>
                        <a href="https://applefacilities.review.blueriver.com">
                            {item.buildingname}
                        </a>
                    </div>
                );
            }else 
            return (
                <div key={item.buildingname}>
                    {item.buildingname}
                </div>
            );
            }
        )
    }

    renderZones() {
        const {items} = this.props.buildings.buildingList.data;
        if(items.length === 0) {
            return <div></div>;
        }
        const sortedZones  =  _.orderBy(items, ['buildingzone'],['asc']);
        const groupedZones =  _.mapValues(_.groupBy(sortedZones, 'buildingzone' ),
            clist => clist.map(sortedZone => _.omit(sortedZone, 'buildingzone')));
        
        const arrayZones = Object.keys(groupedZones);
        const deletedZone = arrayZones.shift();
        arrayZones.push(deletedZone);
        
        return arrayZones.map( (zone,index) => {
            return (
                <React.Fragment key={zone}>
                    <h4>
                        {!zone? "Other" : zone }
                    </h4>
                    <div className="container" key={index}>
                        {this.renderNames(zone)}
                    </div>
                    <hr/>
                </React.Fragment>
            )
        });
    }

    render() {
        return(
            <React.Fragment>
                <h1>Home</h1>
                <hr/>
                {this.renderZones()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        buildings: state.buildings
    };
  }
  
  export default connect(mapStateToProps,{ fetchBuildings })(Home);