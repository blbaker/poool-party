import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

const Container = styled.svg`
  width: 41px;
  height: 40px;
  cursor: pointer;
  border-radius: 100%;
  transition: all 0.25s ease 0s;
  :hover {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Logo = (props) => {
  return (
    <Container onClick={() => Router.push('/')} viewBox="0 0 31 30">
      <g transform="translate(-16.000000, -15.000000)" fill="#000000">
        <path d="M31.4999686,15 C39.7842587,15 46.5,21.7157413 46.5,30.0000314 C46.5,38.284258 39.7842587,45 31.4999686,45 C23.215742,45 16.5,38.284258 16.5,30.0000314 C16.5,21.7157413 23.215742,15 31.4999686,15 Z M34.6918166,22.007777 C34.1999875,22.4997951 33.8910669,23.1051617 33.7642345,23.7397642 C31.3605976,22.8350526 28.6036835,23.4097988 26.7683026,25.2453686 C24.9312841,27.0823871 24.3571053,29.8424518 25.2652186,32.2476006 C24.6265209,32.3730472 24.016744,32.6829758 23.5218897,33.1777667 C22.1963582,34.5032982 22.1963582,36.6525775 23.5218897,37.9781096 C24.8474853,39.3036412 26.9966384,39.3036412 28.3222333,37.9781096 C28.8199219,37.4803576 29.1306702,36.8664849 29.254667,36.2238181 C29.9992784,36.5016136 30.7772204,36.6389053 31.5513181,36.6389053 C33.2708934,36.6389053 34.9694233,35.9708468 36.231634,34.7086367 C38.060462,32.8799349 38.638232,30.1362517 37.7474449,27.7386632 C38.38671,27.6134062 38.9969909,27.3033515 39.4921602,26.80812 C40.8177545,25.4825878 40.8177545,23.333372 39.4921602,22.007777 C38.1666274,20.6822449 36.0174116,20.6822449 34.6918166,22.007777 Z M38.6573224,22.8031713 C39.5313502,23.6771984 39.5313502,25.0993191 38.6573224,25.9733462 C38.1537743,26.4770832 37.460262,26.7080023 36.7534541,26.607318 C36.7196824,26.6025292 36.6867937,26.6037267 36.6544078,26.6075069 C36.4454787,26.5803509 36.2268453,26.6088299 36.0216957,26.7039071 C35.7295351,26.8391816 35.5209832,27.081064 35.4200465,27.3618214 C35.3208741,27.637601 35.3256001,27.9509325 35.4584174,28.237801 C36.2109677,29.863496 35.8650619,31.8072484 34.5976852,33.0746245 C33.3301824,34.3418757 31.3863678,34.6883488 29.7602316,33.9351684 C29.4694568,33.8005234 29.1514627,33.7972466 28.8729102,33.9006404 C28.597005,34.0030263 28.3597218,34.2100657 28.2263377,34.4982578 C28.1411524,34.6821109 28.1088933,34.8768011 28.1224393,35.0655685 C28.1174616,35.1028053 28.1160124,35.1408618 28.1224393,35.1799884 C28.240955,35.8930964 28.0068225,36.6237206 27.4964069,37.1345146 C26.6224426,38.0082267 25.2003219,38.0082267 24.3261692,37.1345146 C23.9027653,36.7109218 23.6695774,36.1480214 23.6695774,35.5493327 C23.6695774,34.9504557 23.9027653,34.3874925 24.3261692,33.9641514 C24.8295912,33.4605399 25.5234826,33.2299986 26.2655735,33.3316282 C26.3404884,33.3467501 26.4164112,33.3572088 26.4935943,33.3572088 C26.6560881,33.3572088 26.8212287,33.3226815 26.9782409,33.2500348 C27.2634085,33.1179731 27.468747,32.884219 27.5723291,32.6119679 C27.6789992,32.3314629 27.6774878,32.0100664 27.5414558,31.7161409 C26.7890317,30.0903826 27.1349374,28.1466935 28.402252,26.8793802 C29.6697542,25.6118773 31.613695,25.2657827 33.239705,26.0187735 C33.5293457,26.1529779 33.8461436,26.1568209 34.1240019,26.0546245 C34.4012307,25.9525537 34.6396474,25.744947 34.7735995,25.4556842 C34.8774346,25.231507 34.9024478,24.9912627 34.8610524,24.7577609 C34.7426,24.0443372 34.9766692,23.3136508 35.4872121,22.8031713 C36.3611752,21.9290186 37.7833593,21.9290186 38.6573224,22.8031713 Z M29.7602944,28.237297 C28.7905612,29.2070937 28.7905612,30.7794225 29.7602944,31.7491564 C30.7300916,32.7190157 32.3024826,32.7190157 33.2722171,31.7491564 C34.2420137,30.7794225 34.2420137,29.2070937 33.2722171,28.237297 C32.3024826,27.2675638 30.7300916,27.2675638 29.7602944,28.237297 Z"></path>
      </g>
    </Container>
  );
};

export default Logo;