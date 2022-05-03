export const Update = () => {
    return (
        <>

            <div style={{
                position: "fixed",
                top: "0",
                left: "0",
                height: "100vh",
                width: "100%",
                zIndex: "9999999"
            }}>
                <div className="text-center mt-5">
                    <div class="btn p-3 shadow " style={{
                        background: "#9e3a8ccc",
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        borderTopLeftRadius: "40px",
                        borderTopRightRadius: "40px",
                        borderBottomLeftRadius: "40px",
                        borderBottomRightRadius: "0px",

                    }}>


                        <h4 style={{   color: "white",}} className="text-center">Succesfully Updated</h4>

                    </div>
                </div>
            </div>
        </>
    );
}