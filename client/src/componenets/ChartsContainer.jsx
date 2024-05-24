import { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
const ChartsContainer = ({data}) => {
const [barChart,SetBarChart]=useState(true)
  return <Wrapper>
    <h4>Monthly Applications</h4>
    <button type='button' onClick={()=> SetBarChart(!barChart)}>
        {barChart? 'Area chart':'Bar Chart'}
    </button>
    {barChart? <BarChart data={data}/>:<AreaChart data={data}/>}
  </Wrapper>
};
export default ChartsContainer;
