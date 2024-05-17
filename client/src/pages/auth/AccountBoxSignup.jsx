import { React, useContext, useState } from "react"
import styled from "styled-components"
import { LoginForm } from "./loginForm"
import { SignupForm } from "./registerForm"
import { motion } from "framer-motion"
import { AccountContext } from "./AccountContext"
import { ColorModeContext } from "@contexts/DarkModeContext"
const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const BoxContainer = styled.div`
  width: 580px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: ${(props) =>
    props.darkMode
      ? "#333"
      : "#fff"}; // Conditionally set background color based on darkMode
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 0 2px rgba(255, 255, 255, 0.3)"
      : "0 0 2px rgba(15, 15, 15, 0.28)"}; // Conditionally set box shadow based on darkMode
  position: relative;
  overflow: hidden;
`

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 7em;
`

const BackDrop = styled(motion.div)`
  position: absolute;
  width: 260%;
  height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  top: -500px;
  left: -530px;
  transform: rotate(60deg);
  background: linear-gradient(
    58deg,
    rgba(243, 172, 18, 1) 20%,
    rgba(241, 196, 15, 1) 100%
  );
`

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const HeaderText = styled.div`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
`

const SmallText = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  margin-top: 7px;
  z-index: 10;
`

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
}

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
}

export default function AccountBoxSignup(props) {
  const [isExpanded, setExpanded] = useState(false)
  const [active, setActive] = useState("signup")
  const { darkMode } = useContext(ColorModeContext)

  const playExpandingAnimation = () => {
    setExpanded(true)
    setTimeout(() => {
      setExpanded(false)
    }, expandingTransition.duration * 1000 - 1500)
  }

  const switchToSignup = () => {
    playExpandingAnimation()
    setTimeout(() => {
      setActive("signup")
    }, 400)
  }

  const switchToSignin = () => {
    playExpandingAnimation()
    setTimeout(() => {
      setActive("signin")
    }, 400)
  }

  const contextValue = { switchToSignup, switchToSignin }

  return (
    <AccountContext.Provider value={contextValue}>
      <MainContainer>
        <BoxContainer darkMode={darkMode}>
          <TopContainer>
            <BackDrop
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}
            />
            {active === "signin" && (
              <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>Back</HeaderText>
                <SmallText>Please sign-in to continue!</SmallText>
              </HeaderContainer>
            )}
            {active === "signup" && (
              <HeaderContainer>
                <HeaderText>Create</HeaderText>
                <HeaderText>Account</HeaderText>
                <SmallText>Please sign-up to continue!</SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {active === "signin" && <LoginForm />}
            {active === "signup" && <SignupForm />}
          </InnerContainer>
        </BoxContainer>
      </MainContainer>
    </AccountContext.Provider>
  )
}
