import "../css/tic-tac-toe.css"

export const Tile = (props) => {

    const tileClass = props.value ? `tic-tac-toe-btn ${props.value}` : 'tic-tac-toe-btn';
    return (
        <div>
            <button className={`${tileClass}  ${props.isWinningTile ? 'winning-tile' : ''}`} onClick={() => props.setTile(props.id)} disabled={props.winner != null || props.value != null}>{props.value}</button>
        </div>
    )
}