import React, { useState, useEffect } from 'react';
import {
  Image,
  Container,
  Form,
  Input,
  Select,
  Button,
  Icon,
} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/logo_size.jpg';
import SearchResults from './SearchResults';
import { connect } from 'react-redux';
import { addValue, addSelect, getClasses } from '../actions/actions';
import './Dashboard.css';

const options = [
  { key: 'name', text: 'Name', value: 'name' },
  { key: 'type', text: 'Type', value: 'type' },
  { key: 'time', text: 'Time', value: 'time' },
  { key: 'duration', text: 'Duration', value: 'duration' },
  { key: 'intensity', text: 'Intensity', value: 'intensity' },
  { key: 'location', text: 'Location', value: 'location' },
];

const adminValue = localStorage.getItem('admin');

const Dashboard = ({ addValue, getClasses, addSelect }) => {
  useEffect(() => {
    getClasses();
  }, [getClasses]);

  let history = useHistory();

  const [selectValue, setSelectValue] = useState();
  const [selected, setSelected] = useState();

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSelectValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addValue(selectValue);
    addSelect(selected);
  };

  const handleSelectChange = (e, { value }) => {
    e.preventDefault();
    setSelected(value);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push('/');
  };

  function LoggedIn(props) {
    return (
      <Button className="class_button" animated="fade">
        <Button.Content visible>Create a Class</Button.Content>
        <Button.Content hidden>
          <Icon name="plus" />
        </Button.Content>{' '}
      </Button>
    );
  }

  function CreateClassButton(props) {
    const isAdmin = props.isAdmin;
    console.log(isAdmin);
    if (isAdmin) {
      return <LoggedIn />;
    }
    return null;
  }

  return (
    <div className="page_root">
      <header className="dashboard_header">
        <Image src={logo}></Image>
        <div className="header_buttons">
          <CreateClassButton isAdmin={adminValue} />

          <Button className="logout_button" onClick={handleLogout} animated>
            <Button.Content visible>Logout</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
      </header>
      <div className="dashboard_root">
        <Container className="left_dashboard">
          <Form className="search_form" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Search..."
              name="values"
              value={selectValue}
              onChange={handleSearchChange}
              action
            >
              <input />
              <Select
                onChange={handleSelectChange}
                options={options}
                value={selected}
                defaultValue="name"
              />
              <Button type="submit">Search</Button>
            </Input>
          </Form>
          <SearchResults />
        </Container>
        <Container className="right_dashboard"></Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    results: state.results,
    newResults: state.newResults,
    value: state.value,
  };
};

const mapDispatchToProps = { addValue, getClasses, addSelect };

export default connect(null, mapDispatchToProps)(Dashboard);
