import Header from "../../components/Header";
import Done from "../../components/dashboard/Done";
import ToDo from "../../components/dashboard/ToDo";
import './dashboard.css'


export default function Dashboard(){
  return (
    <div>
      <Header picture="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"/>
      <div className="dashboardMainContainer">
        <ToDo/>
        <Done/>
      </div>


    </div>
  )
}