import React from "react";
import DetailedPage from "../components/homePageComp/detailedQuestionComp/detailedPage";
interface DetailedProp {
    handlePage: (page: string) => void;
}
const detailedQuestions: React.FC<DetailedProp> = () => {

    return (
    <div>
        <h1 style={{ textAlign: 'center'}}>Detailed Assessment Page</h1>
        <DetailedPage/>          
    </div>
    
    
    );
};
export default detailedQuestions;