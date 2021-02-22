import queryString from 'query-string';
import DevMenu from '../components/DevMenu'

const About = ({location , match}) => {

    const query = queryString.parse(location.search);
    console.log(query)

    const detail = query.detail === 'true';

    return (
        <div>
            <h2>About {match.params.name}</h2>
            <h2>{detail ? '안녕하세요' : '접속오류' }</h2>
            <DevMenu/>
        </div>
    );
};

export default About;