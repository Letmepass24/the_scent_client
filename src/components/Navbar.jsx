import { Badge, Tooltip} from "@material-ui/core";
import { ExitToApp, Search, ShoppingCartOutlined } from "@material-ui/icons";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { persistor } from "../redux/store";
import { login } from "../apiCalls";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 5px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SeacrhContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginRight: "5px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "15px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // console.log(quantity)

  const handleLogOut = () => {
    persistor.purge();
    window.location.reload(false);
  };

  const guestLoginHandler = () => {
    login(dispatch, { username: "zahid", password: "123456" });
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>En</Language>
          <SeacrhContainer>
            <Input placeholder="search" />
            <Search style={{ fontSize: 16, color: "gray" }} />
          </SeacrhContainer>
        </Left>

        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>The Scent</Logo>
          </Link>
        </Center>

        <Right>
          {!user && (
            <>
              {/* <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>REGISTER</MenuItem>
              </Link> */}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>LOG IN</MenuItem>
              </Link>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <MenuItem onClick={guestLoginHandler}>GUEST LOGIN</MenuItem>
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <MenuItem
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  <Tooltip title="Log Out">
                    <ExitToApp />
                  </Tooltip>
                </MenuItem>
              </Link>

              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>
                  <Tooltip title="Profile">
                    <AccountCircleOutlinedIcon />
                  </Tooltip>
                </MenuItem>
              </Link>
            </>
          )}

          <Link
            to="/cart"
            style={{ textDecoration: "none", color: "black" }}
            data-tip
            data-for="registerTip"
          >
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <Tooltip title="Cart">
                  <ShoppingCartOutlined />
                </Tooltip>
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
