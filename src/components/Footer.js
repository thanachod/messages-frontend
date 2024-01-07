
export default function Footer() {

    var now = new Date()
    var year = now.getFullYear()
    return (
        <>
            <div className='footer'>
            Copyright@{year}
            </div>
        </>
    )
}