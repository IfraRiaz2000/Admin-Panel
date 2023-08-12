import React from 'react'
import Chart from '../../components/charts/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import './Home.css'
import {userData} from '../../dummyData'
import WidgetSm from '../../components/widgets/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgets/widgetLg/WidgetLg'

export default function Home() {
  return (
    <div className='home'>
        <FeaturedInfo />
        <Chart  grid  />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
        
    </div>
  )
}
