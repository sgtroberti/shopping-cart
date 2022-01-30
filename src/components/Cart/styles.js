import styled from "styled-components";
import { DrawerFooter, Input, Box } from "@chakra-ui/react";

export const StyledMiniBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  margin-bottom: 4px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      text-align: center;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const StyledAmount = styled(Input)`
  text-align: center;
  max-width: 80px;
`;

export const StyledFooter = styled(DrawerFooter)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;

  div {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    input {
      text-align: center;
    }
  }

  @media (max-width: 800px) {
    flex-direction: row;
    flex-wrap: wrap;

    div {
      width: 100%;
    }
  }
`;
