const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const retryGemini = async (
  fn,
  retries = 3
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const status =
        error?.status ||
        error?.error?.code;

      console.log(
        `Attempt ${attempt} failed. Status: ${status}`
      );

      if (
        (status === 503 || status === 429) &&
        attempt < retries
      ) {
        const delay = attempt * 2000;

        console.log(
          `Retrying in ${delay / 1000}s...`
        );

        await sleep(delay);
        continue;
      }

      throw error;
    }
  }
};