import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import styled, { keyframes } from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 700;
  max-width: 350px;
  color: #222;
  text-align: center;
  font-size: 24px;
  margin-bottom: 5px;
  height: 50px;
`;

const Subtitle = styled.div`
  width: 100%;
  max-width: 450px;
  font-weight: 400;
  color: #444;
  text-align: center;
  font-size: 18px;
  margin: 5px 0px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  padding: 5px 10px;
  border-radius: 10px;
  width: calc(100% - 30px);
  margin: 10px 0px;
  max-height: 300px;
  @media (max-width: 675px) {
    max-height: 175px;
  }

  overflow-y: auto;
`;

const Radio = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
  height: 50px;
  border-radius: 6px;
  width: 100%;
  padding-left: 10px;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  background-color: ${(props) =>
    props.checked ? `${props.theme.palette.dark.monteverde}` : 'transparent'};
  color: ${(props) => (props.checked ? '#fff' : '#222')};
  :hover {
    background-color: ${(props) => props.theme.palette.dark.monteverde};
    color: #fff;
  }
`;

const WrapInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 20px;
  height: 50px;
`;

const Label = styled.div`
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  text-transform: capitalize;
`;

const Input = styled.input`
  display: none;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 30px);
  margin-bottom: 10px;
`;

const Popper = styled.svg`
  width: 25px;
  margin-left: 10px;
  margin-bottom: 3px;
  transition: all 0.25s ease 0s;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  padding: 0 10px;
  margin-top: 10px;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  font-size: 18px;
  text-transform: capitalize;
  height: 50px;
  width: 100%;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  :hover {
    background-color: ${(props) => props.theme.palette.dark.skyGray};
  }
  &:hover ${Popper} {
    transform: rotate(-10deg);
  }
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Spinner = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

const Circle = styled.circle`
  stroke: #fff;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 8px;
`;

const handleOptionChange = async (e, setSelected, setLoading, mutate) => {
  e.preventDefault();
  setLoading(true);
  setSelected(e.target.value);
  try {
    const body = { toy: e.target.value };
    const updatedUser = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await mutate(updatedUser);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

const Onboarding = ({ user }) => {
  const { mutate } = useSWR('/api/user');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name);
  const [selected, setSelected] = useState(user?.toy);
  useEffect(() => user?.name && setName(user?.name), [user?.name]);
  useEffect(() => user?.toy && setSelected(user?.toy), [user?.toy]);

  const scrollItem = useRef(null);
  const executeScroll = () =>
    scrollItem?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  useEffect(() => executeScroll, []);

  const options = ['flamingo', 'unicorn', 'zebra', 'tiger'];
  return (
    <Container>
      <Title>{name ? "Let's choose a pool floaty" : <Skeleton />}</Title>
      <Form>
        {options.map((option) => (
          <Radio
            ref={selected === option ? scrollItem : null}
            checked={selected === option}
            key={option}
          >
            <WrapInput>
              <Label>{option}</Label>
              <Input
                type="radio"
                value={option}
                checked={selected === option}
                onChange={(e) => {
                  handleOptionChange(e, setSelected, setLoading, mutate);
                }}
              />
              {loading && selected === option && (
                <Spinner viewBox="0 0 50 50">
                  <Circle cx="25" cy="25" r="20"></Circle>
                </Spinner>
              )}
            </WrapInput>
          </Radio>
        ))}
      </Form>
      <Footer>
        <Button onClick={() => Router.push('/dashboard')}>
          Ready to go{' '}
          <Popper viewBox="0 0 36 36">
            <path
              fill="#DD2E44"
              d="M11.626 7.488a1.413 1.413 0 0 0-.268.395l-.008-.008L.134 33.141l.011.011c-.208.403.14 1.223.853 1.937c.713.713 1.533 1.061 1.936.853l.01.01L28.21 24.735l-.008-.009c.147-.07.282-.155.395-.269c1.562-1.562-.971-6.627-5.656-11.313c-4.687-4.686-9.752-7.218-11.315-5.656z"
            />
            <path
              fill="#EA596E"
              d="M13 12L.416 32.506l-.282.635l.011.011c-.208.403.14 1.223.853 1.937c.232.232.473.408.709.557L17 17l-4-5z"
            />
            <path
              fill="#A0041E"
              d="M23.012 13.066c4.67 4.672 7.263 9.652 5.789 11.124c-1.473 1.474-6.453-1.118-11.126-5.788c-4.671-4.672-7.263-9.654-5.79-11.127c1.474-1.473 6.454 1.119 11.127 5.791z"
            />
            <path
              fill="#AA8DD8"
              d="M18.59 13.609a.99.99 0 0 1-.734.215c-.868-.094-1.598-.396-2.109-.873c-.541-.505-.808-1.183-.735-1.862c.128-1.192 1.324-2.286 3.363-2.066c.793.085 1.147-.17 1.159-.292c.014-.121-.277-.446-1.07-.532c-.868-.094-1.598-.396-2.11-.873c-.541-.505-.809-1.183-.735-1.862c.13-1.192 1.325-2.286 3.362-2.065c.578.062.883-.057 1.012-.134c.103-.063.144-.123.148-.158c.012-.121-.275-.446-1.07-.532a.998.998 0 0 1-.886-1.102a.997.997 0 0 1 1.101-.886c2.037.219 2.973 1.542 2.844 2.735c-.13 1.194-1.325 2.286-3.364 2.067c-.578-.063-.88.057-1.01.134c-.103.062-.145.123-.149.157c-.013.122.276.446 1.071.532c2.037.22 2.973 1.542 2.844 2.735c-.129 1.192-1.324 2.286-3.362 2.065c-.578-.062-.882.058-1.012.134c-.104.064-.144.124-.148.158c-.013.121.276.446 1.07.532a1 1 0 0 1 .52 1.773z"
            />
            <path
              fill="#77B255"
              d="M30.661 22.857c1.973-.557 3.334.323 3.658 1.478c.324 1.154-.378 2.615-2.35 3.17c-.77.216-1.001.584-.97.701c.034.118.425.312 1.193.095c1.972-.555 3.333.325 3.657 1.479c.326 1.155-.378 2.614-2.351 3.17c-.769.216-1.001.585-.967.702c.033.117.423.311 1.192.095a1 1 0 1 1 .54 1.925c-1.971.555-3.333-.323-3.659-1.479c-.324-1.154.379-2.613 2.353-3.169c.77-.217 1.001-.584.967-.702c-.032-.117-.422-.312-1.19-.096c-1.974.556-3.334-.322-3.659-1.479c-.325-1.154.378-2.613 2.351-3.17c.768-.215.999-.585.967-.701c-.034-.118-.423-.312-1.192-.096a1 1 0 1 1-.54-1.923z"
            />
            <path
              fill="#AA8DD8"
              d="M23.001 20.16a1.001 1.001 0 0 1-.626-1.781c.218-.175 5.418-4.259 12.767-3.208a1 1 0 1 1-.283 1.979c-6.493-.922-11.187 2.754-11.233 2.791a.999.999 0 0 1-.625.219z"
            />
            <path
              fill="#77B255"
              d="M5.754 16a1 1 0 0 1-.958-1.287c1.133-3.773 2.16-9.794.898-11.364c-.141-.178-.354-.353-.842-.316c-.938.072-.849 2.051-.848 2.071a1 1 0 1 1-1.994.149c-.103-1.379.326-4.035 2.692-4.214c1.056-.08 1.933.287 2.552 1.057c2.371 2.951-.036 11.506-.542 13.192a1 1 0 0 1-.958.712z"
            />
            <circle fill="#5C913B" cx="25.5" cy="9.5" r="1.5" />
            <circle fill="#9266CC" cx="2" cy="18" r="2" />
            <circle fill="#5C913B" cx="32.5" cy="19.5" r="1.5" />
            <circle fill="#5C913B" cx="23.5" cy="31.5" r="1.5" />
            <circle fill="#FFCC4D" cx="28" cy="4" r="2" />
            <circle fill="#FFCC4D" cx="32.5" cy="8.5" r="1.5" />
            <circle fill="#FFCC4D" cx="29.5" cy="12.5" r="1.5" />
            <circle fill="#FFCC4D" cx="7.5" cy="23.5" r="1.5" />
          </Popper>
        </Button>
      </Footer>
    </Container>
  );
};

export default Onboarding;
