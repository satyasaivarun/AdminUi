import './index.css'

const Pagination = props => {
  const {selectedPageNumber, eachItem} = props
  const {id, isClicked} = eachItem

  const activeStyle = isClicked ? 'clickedStyle' : 'paginationButtonStyle'

  const pageClicked = () => {
    selectedPageNumber(id)
  }

  return (
    <li className="listPaginationContainer">
      <button
        type="button"
        className={activeStyle}
        value={id}
        onClick={pageClicked}
      >
        {id}
      </button>
    </li>
  )
}

export default Pagination
