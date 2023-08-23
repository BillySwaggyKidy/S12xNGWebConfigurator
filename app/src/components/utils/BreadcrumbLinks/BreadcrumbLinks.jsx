import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavLink from "./NavLink.jsx";

// this component purpose is to the display a inline list of link to make the configuration process more easier by allowing to go back or forward
export default function BreadcrumbLinks({urlPath, endPath = [], excludePathArray = []}) {

    // this function build an array of object containing the data to build the list of link component
    const buildLinkObjectList = () => {
        let idValue = ""; // this id is used to store the last id catched in the url
        const urlArray = urlPath.split("/");
        let pathList = urlArray.filter((path)=>path != "" && !excludePathArray.includes(path)); // we split all of the word of the url without the "/" and we remove the empty value of the new array
        pathList = pathList.slice(0, urlArray.findIndex((path)=>endPath.includes(path)));
        return pathList.map((path, index)=>{
            if (!(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/.test(path))) { // if the word is not detected as an id pattern then
                let pathObject = {
                    name: path.charAt(0).toUpperCase() + path.slice(1),
                    path: "/"+pathList.slice(0,index+1).join('/'),
                    state: idValue ? {paramObject:{id:idValue}} : null
                }; // we create a pathObject containing the name, the url path for the redirection and the state object sended as a parameter in the redirection
                idValue = ""; // we clear the id
                return pathObject;
            }
            else { // if the word is indeed an id then we store for the next word of the url
                idValue = path;
            }
        }).filter((pathObject)=>pathObject);
    };
    let linksList = buildLinkObjectList();

    return (
        <Breadcrumbs
            maxItems={3} // we set the breadcrumbs to hold a max of two links otherwise the middle of the paths is hided by a [...] button
            separator={<NavigateNextIcon fontSize="small" />} // we separate each path by an > icon
            aria-label="breadcrumb"
        >
            {
                linksList.map((link)=>
                    <NavLink key={link.name} name={link.name} path={link.path} state={link.state}/>
                )
            }
        </Breadcrumbs>
    );
}