import { ethers } from "hardhat";

async function main() {
  // 배포된 컨트랙트 주소
  const TOKEN_ADDRESS = "0xABcCeEE080A17C4549f30f3a7dcf89a090A6E744";

  // 받을 지갑 주소와 수량 설정 (수량은 ETH 단위로 설정, 자동으로 10**18을 곱함)
  const distributions = [
    {
      address: "0x162CF24de96b6E18fB795D612Dbcf641892ddA89", // 본인 지갑 주소
      amount: "1000000", // 100만 JAEGUN 토큰
    },
    // 필요시 더 추가 가능
    // { address: "다른 지갑 주소", amount: "수량" }
  ];

  // 컨트랙트 연결
  const token = await ethers.getContractAt("JaegunToken", TOKEN_ADDRESS);

  // 현재 연결된 지갑 주소 출력
  const [deployer] = await ethers.getSigners();
  console.log("Distributing tokens from:", deployer.address);

  // 토큰 분배 실행
  for (const dist of distributions) {
    console.log(`Transferring ${dist.amount} JAEGUN to ${dist.address}...`);
    const tx = await token.transfer(
      dist.address,
      ethers.parseEther(dist.amount)
    );
    await tx.wait();
    console.log("Transfer completed! Transaction hash:", tx.hash);

    // 잔액 확인
    const balance = await token.balanceOf(dist.address);
    console.log(
      `New balance of ${dist.address}: ${ethers.formatEther(balance)} JAEGUN`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
