const RestaurantDetails = ({params}) => {
    const name = params.name
  return (
    <div>{decodeURI(name)}</div>
  )
}
export default RestaurantDetails
