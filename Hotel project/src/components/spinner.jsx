// require("../../public/")
// require("public/css/nivo-lightbox/loading.gif")
const Spinner = ({ size }) => { 
    let styleSpinner = {
        borderRadius: '45%',
        width: size||'10%',
        backgroundColor: 'chocolate',
      };
    return (
        <>
             <img
              style={styleSpinner}
              src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif"
              alt=""
            />
        </>
    )
}
export default Spinner