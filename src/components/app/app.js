import { Component } from 'react';
import styled from 'styled-components';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

// class WhoAmI extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       years: 27,
//       position: ''
//     }
//   }

//   nextYear = () => {
//     this.setState(state => ({
//       years: state.years + 1
//     }))
//   }

//   commitInputChanges = (e, color) => {
//     console.log(color)
//     this.setState({
//       position: e.target.value
//     })
//   }
  
//   render() {
//     const {name, surname, link} = this.props;
//     const {position, years} = this.state;
//     return (
//       <div>
//         <button onClick={this.nextYear}>+++</button>
//         <h1>My name is {name}, surname - {surname}, age - {years}, position - {position}</h1>
//         <a href={link}>My profile</a>
//         <form>
//           <span>Введите должность</span>
//           <input type="text" onChange={(e) => this.commitInputChanges(e, 'text')} />
//         </form>
//       </div>
//     )
//   }
// }

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 30px auto;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
        {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
        {name: 'Carl W.', salary: 25000, increase: false, rise: false, id: 3}
      ],
      term: '',
      filter: 'all',
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(elem => elem.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name, 
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    });
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }

  onChangeSalary = (id, newSalary) => {
    const newSalaryNumber = +newSalary.replace('$','');
    if (typeof newSalaryNumber !== 'number' || newSalaryNumber <= 0) {
      return;
    }
    console.log(id, newSalaryNumber);
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, salary: newSalaryNumber}
        }
        return item;
      })
    }))
  }

  searchEmployee = (items, term) => {
    if (!term.length) {
      return items;
    }

    return items.filter(item => {
      const name = item.name.toLowerCase();
      return name.indexOf(term) > -1;
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch(filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render() {
    // return (
    //   <div className="App">
    //     <WhoAmI name='John' surname='Smith' link="facebook.com" />
    //     <WhoAmI name='Alex' surname='Shepard' link="vk.com" />
    //   </div>
    // )
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmployee(data, term), filter);

    return (
      <Wrapper className="app">
        <AppInfo 
          employees={employees}
          increased={increased}
        />

        <div className="search-panel">
          <SearchPanel 
            onUpdateSearch={this.onUpdateSearch}
          />
          <AppFilter 
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>

        <EmployeesList
          data={visibleData} 
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          onChangeSalary={this.onChangeSalary}
        />

        <EmployeesAddForm
          onAdd={this.addItem}
        />
      </Wrapper>
    );
  }
}

export default App;