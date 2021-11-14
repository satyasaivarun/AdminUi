import {FiEdit} from 'react-icons/fi'
import {RiDeleteBin7Line} from 'react-icons/ri'
import {Component} from 'react'
import './index.css'

class UserItems extends Component {
  render() {
    const {
      eachUserItem,
      singleDeleteClicked,
      deleteList,
      editUserDetails,
    } = this.props
    const {id, name, email, role, check} = eachUserItem

    const onDeleteItem = () => {
      singleDeleteClicked(id)
    }

    const eachItemCheckboxClicked = event => {
      deleteList(event.target.id)
    }

    const editItemClicked = () => {
      editUserDetails(id)
    }

    return (
      <li>
        <div className="list-item-container">
          <input
            id={id}
            type="checkbox"
            checked={check}
            className="checkbox-style"
            onChange={eachItemCheckboxClicked}
          />
          <p className="name-style">{name}</p>

          <p className="email-style">{email}</p>

          <p className="role-style">{role}</p>
          <div>
            <button className="button" type="button" onClick={editItemClicked}>
              <FiEdit className="react-icon-style" />
            </button>
            <button
              className="button delete"
              type="button"
              onClick={onDeleteItem}
            >
              <RiDeleteBin7Line className="react-delete-icon-style" />
            </button>
          </div>
        </div>
        <hr className="horizontal-line" />
      </li>
    )
  }
}

export default UserItems
