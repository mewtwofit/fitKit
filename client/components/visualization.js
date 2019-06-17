import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LineChart} from 'react-chartkick';
import 'chart.js';



class Visualization extends Component{
    constructor(props){
        super(props);
    }
    render(){
        
        console.log(this.props.diet)
        let graphData = {};
        for (let i = 0; i < this.props.diet.length;i++){
            if (!graphData[this.props.diet[i].date]){
                //console.log('!graphdata[this.props.diet[i].date]',i,this.props.diet[i].date);
                graphData[this.props.diet[i].date] = this.props.diet[i].calories;
            } else {
                graphData[this.props.diet[i].date]+=this.props.diet[i].calories;
            }
        }
        console.log(graphData);
        /*
        
        let monthsConversion = {
                            'Jan': '01',
                            'Feb': '02',
                            'Mar': '03',
                            'Apr': '04',
                            'May': '05',
                            'Jun': '06',
                            'Jul': '07',
                            'Aug': '08',
                            'Sep': '09',
                            'Oct': '10',
                            'Nov': '11',
                            'Dec': '12'
                                }
        let newGraphData = {};
        for (let key in GraphData){
            let string = '';
            string+=key.slice(7);
            string+='-'
            string+=monthsConversion[key.slice(0,3)];
            string+='-'
            string+=key.slice(4,6);
            newGraphData[string]=graphData[key]
        }
        
        console.log(newGraphData);
        */
       let dateObj = {'2019-06-17': "700", 'Jun 16 2019': 600}
        return (
            //'hello'
            <LineChart data={graphData} />
        );
    }
    




}

const mapStateToProps = state => ({
    diet: state.reducers.diet
  });
  
  export default connect(
    mapStateToProps
  )(Visualization);