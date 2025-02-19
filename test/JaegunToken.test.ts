import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { JaegunToken } from "../typechain-types";
describe("JaegunToken", function () {
  let token: JaegunToken;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("JaegunToken");
    token = (await factory.deploy(owner.address)) as unknown as JaegunToken;
  });

  describe("배포", function () {
    it("올바른 이름과 심볼로 설정되어야 합니다", async function () {
      expect(await token.name()).to.equal("JAEGUN");
      expect(await token.symbol()).to.equal("JAEGUN");
    });

    it("초기 공급량이 올바르게 설정되어야 합니다", async function () {
      const totalSupply = await token.totalSupply();
      expect(totalSupply).to.equal(ethers.parseEther("1000000000"));
    });

    it("전체 토큰이 배포자에게 할당되어야 합니다", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("트랜잭션", function () {
    it("토큰 전송이 올바르게 동작해야 합니다", async function () {
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
    });

    it("충분한 토큰이 없을 경우 전송이 실패해야 합니다", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });
  });

  describe("발행과 소각", function () {
    it("소유자만 새로운 토큰을 발행할 수 있어야 합니다", async function () {
      await token.mint(addr1.address, 100);
      expect(await token.balanceOf(addr1.address)).to.equal(100);
    });

    it("소유자가 아닌 계정은 토큰을 발행할 수 없어야 합니다", async function () {
      await expect(
        token.connect(addr1).mint(addr1.address, 100)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });

    it("토큰 보유자는 자신의 토큰을 소각할 수 있어야 합니다", async function () {
      await token.transfer(addr1.address, 100);
      await token.connect(addr1).burn(50);
      expect(await token.balanceOf(addr1.address)).to.equal(50);
    });
  });
});
