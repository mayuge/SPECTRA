const useMenuSiteMain = () => {
  const buttonClicked = () => {
    alert("button-clicked")
  }
  const navigateToHomeSite =()=>{
    window.location.href = "/" // ホームに遷移する
  }
  return {
    buttonClicked,
    navigateToHomeSite,
  }
}
export default useMenuSiteMain
