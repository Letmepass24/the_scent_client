import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  font-size: 14px;
  font-weight: 500;
  background-color: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Announcement = () => {
  return (
    <Container>
      WE HAVE NEW OFFERS!!!
    </Container>
  );
};

export default Announcement;
