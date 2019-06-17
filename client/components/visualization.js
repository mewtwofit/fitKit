import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LineChart} from 'react-chartkick';
import 'chart.js';



class Visualization extends Component{
    constructor(props){
        super(props);
    }
    render(){
        // console.log("Exercises", this.props.exercises);
        // console.log(this.props.diet)
        let graphData = {};
        for (let i = 0; i < this.props.diet.length;i++){
            if (!graphData[this.props.diet[i].date]){
                //console.log('!graphdata[this.props.diet[i].date]',i,this.props.diet[i].date);
                graphData[this.props.diet[i].date] = this.props.diet[i].calories;
            } else {
                graphData[this.props.diet[i].date]+=this.props.diet[i].calories;
            }
        }
        // console.log(graphData);

        // crete an object literal exercise data
            let exerciseData = {};
            for(let i = 0; i < this.props.exercises.length; i++) {
                if(!exerciseData[this.props.exercises[i].date]) {
                  exerciseData[this.props.exercises[i].date] = this.props.exercises[i].calories;      
                } 
                else {
                    exerciseData[this.props.exercises[i].date] += this.props.exercises[i].calories;           
                }  
            }
            console.log(exerciseData);

        // use a for loop to loop through the props of exercises and check to see if the newly created object has the date
        // if not there, add the date as key and calories as value
        // if there, then add calories to value
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
            <div>
            <h1> Calories Consumed </h1>
            <LineChart data={graphData} />
            <h1> Calories Burned </h1>
            <LineChart data={exerciseData} />
            </div>
        );
    }
    




}

const mapStateToProps = state => ({
    diet: state.reducers.diet,
    exercises: state.reducers.exercises
  });
  
  export default connect(
    mapStateToProps
  )(Visualization);