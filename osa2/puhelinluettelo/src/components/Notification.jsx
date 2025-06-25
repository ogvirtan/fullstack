const Notification = ({alertmsg, error}) =>{
    if (alertmsg === null){
        return null
    }
    const alertStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20',
        borderStyle: 'solid',
        borderRadius: '5',
        padding: '10',
        marginBottom: '10'
    }
    if (error){
        alertStyle.color = 'red'
    }
    return(
        <div style={alertStyle}>{alertmsg}</div>
    )
}

export default Notification