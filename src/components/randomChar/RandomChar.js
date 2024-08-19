import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000)
    }

    componentWillUnmount() {
        // clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false, error: false});
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    updateChar = () => {
        this.setState({loading: true});
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {
        const {char: char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const displayDescription = description ? (description.length > 150 ? `${description.slice(0, 150)}...` : description) : 'Опис персонажа не знайдено';
    const notAvailableImage = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const imageStyle = notAvailableImage ? {objectFit: 'contain'} : {};

    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={imageStyle} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{displayDescription}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;