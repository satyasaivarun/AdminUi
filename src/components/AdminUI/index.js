import './index.css'
import {Component} from 'react'
import UserItems from '../UserItems'
import Pagination from '../Pagination'

class AdminUI extends Component {
  state = {
    userList: [],
    searchText: '',
    deleteItemsList: [],
    paginationItems: [],
    pages: [{id: 1, isClicked: true}, {id: 2}, {id: 3}, {id: 4}, {id: 5}],
    allSelect: '',
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const apiUrl =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const startPages = fetchedData.slice(0, 10)
    this.setState({
      userList: fetchedData,
      paginationItems: startPages,
    })
  }

  editUserDetails = id => {
    console.log(id)
  }

  singleDeleteClicked = id => {
    const {paginationItems, userList} = this.state
    const remainingList = paginationItems.filter(
      eachUserItem => eachUserItem.id !== id,
    )
    this.setState({paginationItems: remainingList})
    const resultantUserList = userList.filter(eachItem => eachItem.id !== id)
    this.setState({userList: resultantUserList})
  }

  searchInput = event => {
    this.setState({searchText: event.target.value})
  }

  deleteSelectedClicked = () => {
    const {deleteItemsList, paginationItems, userList} = this.state
    const remainingList = paginationItems.filter(
      eachItem => !deleteItemsList.includes(parseInt(eachItem.id)),
    )
    this.setState({paginationItems: remainingList, allSelect: ''})
    const remainingUserList = userList.filter(
      eachItem => !deleteItemsList.includes(parseInt(eachItem.id)),
    )
    console.log(remainingUserList)
    this.setState({userList: remainingUserList})
  }

  addDeleteList = id => {
    const {deleteItemsList} = this.state
    const appendList = deleteItemsList.push(parseInt(id))
    this.setState((deleteItemsList: appendList))
  }

  allSelected = () => {
    const {paginationItems} = this.state
    this.setState(prevState => ({
      paginationItems: prevState.paginationItems.map(eachPaginationItems => {
        if (eachPaginationItems.check) {
          return {
            ...eachPaginationItems,
            check: false,
          }
        }
        return {
          ...eachPaginationItems,
          check: true,
        }
      }),
    }))
    this.setState({
      deleteItemsList: paginationItems.map(eachId => parseInt(eachId.id)),
    })
    this.setState({allSelect: 'checked'})
  }

  selectedPageNumber = num => {
    const {userList} = this.state
    const max = parseInt(num) * 10
    const min = max - 10
    const pagesDisplayList = userList.slice(min, max)
    this.setState({paginationItems: pagesDisplayList})
    this.setState(prevState => ({
      pages: prevState.pages.map(eachPaginationItems => {
        if (num === eachPaginationItems.id) {
          return {
            ...eachPaginationItems,
            isClicked: !eachPaginationItems.isClicked,
          }
        }
        return {
          ...eachPaginationItems,
          isClicked: false,
        }
      }),
    }))
  }

  render() {
    const {searchText, paginationItems, pages, allSelect} = this.state
    const resultList = paginationItems.filter(
      eachUserItem =>
        eachUserItem.name.toLowerCase().includes(searchText.toLowerCase()) ||
        eachUserItem.email.toLowerCase().includes(searchText.toLowerCase()) ||
        eachUserItem.role.toLowerCase().includes(searchText.toLowerCase()),
    )
    return (
      <div className="background-container">
        <input
          type="search"
          className="search-bar-style"
          placeholder="Search by name,email,or role"
          onChange={this.searchInput}
        />
        <div className="main-list-item-container">
          <input
            type="checkbox"
            checked={allSelect}
            className="main-checkbox-style"
            onChange={this.allSelected}
          />
          <h1 className="main-name-style">Name</h1>

          <h1 className="main-email-style">Email</h1>

          <h1 className="main-role-style">Role</h1>
          <h1 className="main-actions-style">Actions</h1>
        </div>
        <hr className="horizontal-line" />
        <ul className="unOrderList-style">
          {resultList.map(eachUserItem => (
            <UserItems
              key={eachUserItem.id}
              eachUserItem={eachUserItem}
              singleDeleteClicked={this.singleDeleteClicked}
              deleteList={this.addDeleteList}
              editUserDetails={this.editUserDetails}
            />
          ))}
        </ul>
        <button
          onClick={this.deleteSelectedClicked}
          type="button"
          className="deleteSelected"
        >
          Delete Selected
        </button>
        <ul className="pagination">
          {pages.map(eachItem => (
            <Pagination
              key={eachItem.id}
              eachItem={eachItem}
              selectedPageNumber={this.selectedPageNumber}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default AdminUI
