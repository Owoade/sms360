const Container = (props) => {
    const containerStyle={
        backgroundColor:"red"
    }
   const Header=props.myComponent
    return ( 
        <div className="container" style={containerStyle}>
            <Header />
        </div>
     );
}
 
export default Container;