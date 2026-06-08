import dns from "node:dns/promises";

try {
  const records = await dns.resolveSrv(
    "_mongodb._tcp.cluster0.hubozbh.mongodb.net"
  );

  console.log("SUCCESS");
  console.log(records);
} catch (err) {
  console.error("FAILED");
  console.error(err);
}