import Error from "../../components/error/error.component.tsx";
// import notFoundImage from "/not-found.png";

const NotFoundView = () => {

    return (
        <Error
            status={404}
            title="Page not found"
            message="The page you are looking for does not exist."
            // imageSrc={notFoundImage}
        />
    );

};

export default NotFoundView;