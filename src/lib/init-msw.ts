let workerStarted = false;

export async function initMSW() {
  if (workerStarted) {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  const shouldMock = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

  if (!shouldMock) {
    return;
  }

  const { worker } = await import("@/mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
  });

  workerStarted = true;
}
