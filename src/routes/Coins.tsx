import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CoinsList = styled.ul``

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    font-weight: bold;
    /* 글씨 밖까지 클릭되게 하기 위해서 block 처리 */
    /* display: block; */
  }
  &:hover {
    a {
      color: ${props =>props.theme.accentColor};
    }
  }
`

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`

// API도 type설정 필수
interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

interface ICoinsProps {
  toggleDark: () => void;
}

// 반드시 style 밑에 function 작성
function Coins({ toggleDark }: ICoinsProps) {
  /** useQuery('queryKey', fetcher function) **/
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins)
  return (
    <Container>
            <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <Button onClick={toggleDark}>☀️ / 🌙</Button>
      </Header>
      {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={{
                    pathname: `/${coin.id}`,
                    state: {name: coin.name},
                  }}>
                  <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                  {/* rarr; : 오른쪽 방향의 화살표 삽입 */}
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )
      }
    </Container>
  )
}

export default Coins;

const Button = styled.button`
  cursor: pointer;
  text-align: center;
  width: 75px; 
  height: 35px;
  background: ivory;
  border-radius: 100px;
  border: 1px solid #1D232C;
  margin-left: 10px;
  margin-top: 1em;
`