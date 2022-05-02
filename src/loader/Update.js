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
                <div class="shadow">

                    <div class="modal-dialog border-none " style={{ boxShadow: "0 3px 6px #00000036", }} role="document">
                        <div class="modal-content py-5">

                            <h4 style={{ color: "#9e3a8ccc" }} className="text-center">Succesfully Updated</h4>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}