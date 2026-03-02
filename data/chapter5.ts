import type { ChapterMeta } from './types';

const chapter5: ChapterMeta = {
  id: '5',
  title: 'Transpose and Row Rank',
  subtitle: 'Rows, Columns, and a Surprising Equality',
  description: 'Discover the transpose operation and explore the deep symmetry between row space and column space through the Row Rank Theorem — one of the most elegant results in linear algebra.',
  color: 'amber',
  accentHex: '#F59E0B',
  sections: [
    {
      id: '5-1',
      chapterId: '5',
      sectionNumber: '5.1',
      title: 'The Transpose',
      estimatedMinutes: 10,
      plainEnglish: [
        'The **transpose** of a matrix flips it across its main diagonal. Every row becomes a column and every column becomes a row. If $A$ is an $m \\times n$ matrix, then $A^t$ is an $n \\times m$ matrix, and the entry in row $i$, column $j$ of $A^t$ equals the entry in row $j$, column $i$ of $A$.',
        'A column vector $\\mathbf{v} \\in \\mathbb{R}^m$ is just an $m \\times 1$ matrix. Its transpose $\\mathbf{v}^t$ is a $1 \\times m$ matrix — we call this a **row vector**. Row vectors let us write dot products as matrix products: $\\mathbf{u}^t \\mathbf{v} = \\mathbf{u} \\cdot \\mathbf{v}$.',
        'Up to this point, we have studied matrices entirely through their columns. The transpose lets us apply everything we know about column structure to the rows of the original matrix — it is our gateway to studying row space.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 5.1',
          title: 'Transpose',
          content: 'Let $A$ be an $m \\times n$ matrix. Its **transpose** $A^t$ is the $n \\times m$ matrix defined by $(A^t)_{ij} = A_{ji}$. For a column vector $\\mathbf{v} \\in \\mathbb{R}^m$, the transpose $\\mathbf{v}^t$ is a $1 \\times m$ row vector.',
        },
        {
          type: 'remark',
          label: 'Remark 5.1',
          content: 'Transposing twice returns the original: $(A^t)^t = A$. The transpose of a product reverses the order: $(AB)^t = B^t A^t$. You can verify this by checking dimensions: if $A$ is $m \\times n$ and $B$ is $n \\times p$, then $(AB)^t$ is $p \\times m = B^t A^t$.',
        },
      ],
      diagram: {
        type: 'TransposeVisualizer',
        props: { initialMatrix: [[1, 2, 3], [4, 5, 6]] },
      },
      whyItMatters: {
        context: 'The transpose is fundamental to nearly every branch of applied mathematics.',
        applications: [
          'Symmetric matrices $A = A^t$ arise in physics, statistics, and optimization — covariance matrices and moment-of-inertia tensors are all symmetric',
          'In machine learning, the normal equations for least-squares regression involve $A^t A$ and $A^t \\mathbf{b}$',
          'Quantum mechanics uses Hermitian matrices (the complex analog of symmetric), whose transpose plays a central role',
          'The transpose determines the "adjoint" of a linear map, connecting input and output spaces in a dual relationship',
        ],
      },
      resources: [
        {
          title: 'Transpose of a matrix',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=TZrKrNVhbjI',
          durationMinutes: 5,
          description: 'Clear introduction to the mechanics of transposing a matrix.',
        },
        {
          title: 'Lecture 14: Orthogonal vectors and subspaces',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=YzZUIYRCE38',
          durationMinutes: 47,
          description: 'Gilbert Strang introduces the transpose in the context of orthogonality.',
        },
      ],
      quiz: [
        {
          id: '5-1-q1',
          type: 'multiple-choice',
          question: 'If $A$ is a $3 \\times 5$ matrix, what are the dimensions of $A^t$?',
          options: ['$3 \\times 5$', '$5 \\times 3$', '$5 \\times 5$', '$3 \\times 3$'],
          correctAnswer: 1,
          explanation: 'Transposing an $m \\times n$ matrix gives an $n \\times m$ matrix. So a $3 \\times 5$ matrix transposes to $5 \\times 3$.',
        },
        {
          id: '5-1-q2',
          type: 'true-false',
          question: '$(AB)^t = A^t B^t$ for all matrices $A$ and $B$ with compatible dimensions.',
          correctAnswer: false,
          explanation: 'The correct rule is $(AB)^t = B^t A^t$ — the transpose reverses the order of multiplication, just like the inverse does.',
        },
        {
          id: '5-1-q3',
          type: 'multiple-choice',
          question: 'Which expression equals the dot product $\\mathbf{u} \\cdot \\mathbf{v}$ using matrix notation?',
          options: ['$\\mathbf{u} \\mathbf{v}^t$', '$\\mathbf{u}^t \\mathbf{v}$', '$\\mathbf{u} \\mathbf{v}$', '$\\mathbf{u}^t \\mathbf{v}^t$'],
          correctAnswer: 1,
          explanation: '$\\mathbf{u}^t$ is a $1 \\times m$ row vector and $\\mathbf{v}$ is an $m \\times 1$ column vector, so $\\mathbf{u}^t \\mathbf{v}$ is a $1 \\times 1$ matrix — the dot product.',
        },
      ],
      commonMistakes: [
        'Writing $(AB)^t = A^t B^t$ instead of $B^t A^t$ — the transpose reverses order, just as the inverse does.',
        'Confusing a row vector $\\mathbf{v}^t$ with a column vector — they have different dimensions and behave differently in matrix products.',
        'Assuming $(A^t)^{-1} = (A^{-1})^t$ without knowing $A$ is invertible — this identity only holds for square invertible matrices.',
      ],
    },
    {
      id: '5-2',
      chapterId: '5',
      sectionNumber: '5.2',
      title: 'Properties of the Transpose',
      estimatedMinutes: 8,
      plainEnglish: [
        'The transpose interacts cleanly with all the matrix operations we have studied. Addition and scalar multiplication pass straight through: $(A + B)^t = A^t + B^t$ and $(rA)^t = rA^t$. For products, the rule reverses order: $(AB)^t = B^t A^t$.',
        'When $A$ is invertible, so is $A^t$, and its inverse is the transpose of $A^{-1}$: $(A^t)^{-1} = (A^{-1})^t$. This is sometimes written $A^{-t}$. You can verify it directly: $A^t (A^{-1})^t = (A^{-1} A)^t = I^t = I$.',
        'A useful extension of the product rule: $(ABC)^t = C^t B^t A^t$. Each factor transposes and the whole product reverses. This generalizes to any number of factors.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 5.2',
          title: 'Transpose Algebra',
          content: 'Let $A$ and $B$ be $m \\times n$ matrices, $r \\in \\mathbb{R}$, and let $A, B$ have a well-defined product $AB$. Then:\\begin{enumerate} \\item $(A^t)^t = A$ \\item $(A + B)^t = A^t + B^t$ \\item $(rA)^t = rA^t$ \\item $(AB)^t = B^t A^t$ \\item If $A$ is square and invertible: $(A^t)^{-1} = (A^{-1})^t =: A^{-t}$ \\end{enumerate}',
        },
      ],
      whyItMatters: {
        context: 'These algebraic rules make the transpose a well-behaved operation that fits seamlessly into calculations.',
        applications: [
          'The rule $(AB)^t = B^t A^t$ is used constantly in deriving gradient formulas in machine learning',
          'In numerical linear algebra, computing $(A^t A)^{-1} A^t$ (the pseudoinverse) relies on all these identities',
          'When checking if a matrix is symmetric, the identity $(A + A^t)^t = A^t + A$ immediately shows $A + A^t$ is always symmetric',
        ],
      },
      resources: [
        {
          title: 'Transpose properties',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=2t0003_sxtU',
          durationMinutes: 8,
          description: 'Detailed walkthrough of the algebraic properties of matrix transpose.',
        },
        {
          title: 'Symmetric matrices and transpose',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=AqZFV7Nf08U',
          durationMinutes: 12,
          description: 'Gilbert Strang discusses symmetric matrices and the role of the transpose.',
        },
      ],
      quiz: [
        {
          id: '5-2-q1',
          type: 'multiple-choice',
          question: 'Which of the following is always symmetric (equals its own transpose) for any matrix $A$?',
          options: ['$A^2$', '$A + A^t$', '$A - A^t$', '$A A^t - A^t A$'],
          correctAnswer: 1,
          explanation: '$(A + A^t)^t = A^t + (A^t)^t = A^t + A = A + A^t$. So $A + A^t$ is always symmetric.',
        },
        {
          id: '5-2-q2',
          type: 'true-false',
          question: 'If $A$ is invertible, then $(A^t)^{-1} = (A^{-1})^t$.',
          correctAnswer: true,
          explanation: 'We verify: $A^t \\cdot (A^{-1})^t = (A^{-1} A)^t = I^t = I$. So $(A^{-1})^t$ is indeed the inverse of $A^t$.',
        },
      ],
      commonMistakes: [
        'Applying the transpose rule as $(AB)^t = A^t B^t$ — always reverse the order: $(AB)^t = B^t A^t$.',
        'Assuming every matrix plus its transpose equals the zero matrix — $A + A^t$ is symmetric, not zero.',
      ],
    },
    {
      id: '5-3',
      chapterId: '5',
      sectionNumber: '5.3',
      title: 'Row Rank',
      estimatedMinutes: 10,
      plainEnglish: [
        'We already know that the **rank** of a matrix $A$ is the dimension of its column space. Now we define the **row rank** as the rank of $A^t$, which equals the dimension of the span of the row vectors of $A$.',
        'Think of each row of $A$ as a $1 \\times n$ row vector. These row vectors span a subspace of $\\mathbb{R}^n$ — the **row space** of $A$. The row rank is the dimension of this row space, i.e., the number of linearly independent rows.',
        'At first glance, there is no reason to expect row rank and column rank to be equal. Rows and columns have completely different dimensions. But the **Row Rank Theorem** tells us they are always equal — a deep and non-obvious symmetry of every matrix.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 5.3',
          title: 'Row Rank',
          content: 'Let $A$ be an $m \\times n$ matrix. Its **row rank** is defined as $\\text{Rowrank}(A) := \\text{Rank}(A^t)$, the dimension of the span of the row vectors of $A$.',
        },
        {
          type: 'theorem',
          label: 'Theorem 5.4',
          title: 'Row Rank Theorem',
          content: 'For any matrix $C$: $$\\text{Rank}(C) = \\text{Rowrank}(C)$$ The column rank and row rank of every matrix are equal.',
          note: 'The proof uses matrix factoring — we will build it up in the next section.',
        },
      ],
      diagram: {
        type: 'TransposeVisualizer',
        props: { initialMatrix: [[1, 2, 4], [2, 4, 8], [3, 1, 5]] },
      },
      whyItMatters: {
        context: 'The equality of row rank and column rank reveals a fundamental symmetry hidden inside every matrix.',
        applications: [
          'In data science, the rank of a data matrix counts the number of truly independent features regardless of whether we view data as rows or columns',
          'The theorem guarantees that the number of independent equations in a linear system equals the number of independent constraints — rows and columns carry the same information about rank',
          'It underpins the singular value decomposition: the non-zero singular values of $A$ and $A^t$ are identical',
        ],
      },
      resources: [
        {
          title: 'Column space and row space',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=uQhTuRlWMxw',
          durationMinutes: 10,
          description: 'Intuition for how column and row spaces are related.',
        },
        {
          title: 'Rank and the row reduced form',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=osh80YCg_GM',
          durationMinutes: 45,
          description: 'Gilbert Strang on rank, column space, and row space.',
        },
      ],
      quiz: [
        {
          id: '5-3-q1',
          type: 'multiple-choice',
          question: 'A $4 \\times 6$ matrix $A$ has $\\text{Rank}(A) = 3$. What is $\\text{Rank}(A^t)$?',
          options: ['$1$', '$3$', '$4$', '$6$'],
          correctAnswer: 1,
          explanation: 'By the Row Rank Theorem, $\\text{Rank}(A^t) = \\text{Rowrank}(A) = \\text{Rank}(A) = 3$.',
        },
        {
          id: '5-3-q2',
          type: 'true-false',
          question: 'A matrix can have more linearly independent rows than linearly independent columns.',
          correctAnswer: false,
          explanation: 'The Row Rank Theorem guarantees that row rank always equals column rank. It is impossible for one to exceed the other.',
        },
      ],
      commonMistakes: [
        'Thinking row rank and column rank could differ — they are always equal, which is the content of the Row Rank Theorem.',
        'Confusing the row space (a subspace of $\\mathbb{R}^n$) with the column space (a subspace of $\\mathbb{R}^m$) — they live in completely different spaces.',
        'Assuming the row rank of a tall matrix ($m > n$) must be larger because there are more rows — rank is bounded by $\\min(m, n)$ regardless.',
      ],
    },
    {
      id: '5-4',
      chapterId: '5',
      sectionNumber: '5.4',
      title: 'The Row Rank Theorem: Proof via Factoring',
      estimatedMinutes: 12,
      plainEnglish: [
        'The proof of the Row Rank Theorem uses a clever intermediate idea: **matrix factoring**. A **$q$-factoring** of $C$ is a way to write $C = AB$ where $A$ is $m \\times q$ and $B$ is $q \\times n$. The number $q$ is like a bottleneck: information must pass through a $q$-dimensional space.',
        'The key lemmas are: (1) if $C$ has a $q$-factoring, then $\\text{Rank}(C) \\leq q$; (2) if $\\text{Rank}(C) = r$, then $C$ has an $r$-factoring (take $A$ to be any matrix whose columns form a basis for $\\text{Col}(C)$). Together, these let us bound the rank of a matrix by looking at any factoring.',
        'The proof then works by a symmetric sandwich argument. Using factoring, we can show $\\text{Rank}(C^t) \\leq \\text{Rank}(C)$. Applying this same inequality to $C^t$ gives $\\text{Rank}(C) = \\text{Rank}((C^t)^t) \\leq \\text{Rank}(C^t)$. Combining both directions forces equality.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 5.5',
          title: 'Matrix Factoring',
          content: 'Let $C$ be an $m \\times n$ matrix. We say $C = AB$ is a **$q$-factoring** if $A$ is $m \\times q$ and $B$ is $q \\times n$.',
        },
        {
          type: 'lemma',
          label: 'Lemma 5.6',
          content: 'If $C$ has a $q$-factoring $C = AB$, then $\\text{Rank}(C) \\leq q$.',
          note: 'Proof: $\\text{Col}(C) = \\text{Col}(AB) \\subseteq \\text{Col}(A)$, and $\\dim(\\text{Col}(A)) \\leq q$.',
        },
        {
          type: 'lemma',
          label: 'Lemma 5.7',
          content: 'If $\\text{Rank}(C) = r$, then $C$ has an $r$-factoring.',
          note: 'Proof: let $A$ be the $m \\times r$ matrix whose columns form a basis for $\\text{Col}(C)$. Then each column of $C$ is a linear combination of the columns of $A$, giving the needed $r \\times n$ matrix $B$.',
        },
        {
          type: 'theorem',
          label: 'Theorem 5.8',
          title: 'Row Rank Theorem (Proof)',
          content: 'For any matrix $C$, $\\text{Rank}(C^t) \\leq \\text{Rank}(C)$ (from the $r$-factoring of $C$ applied to $C^t = B^t A^t$). Applying this to $C^t$ gives $\\text{Rank}(C) \\leq \\text{Rank}(C^t)$. Together: $\\text{Rank}(C) = \\text{Rank}(C^t)$.',
        },
      ],
      whyItMatters: {
        context: 'The factoring argument is a template for bounding rank that appears throughout advanced linear algebra.',
        applications: [
          'Low-rank approximations in data compression (JPEG, Netflix recommendation) exploit the idea that $C \\approx AB$ with small $q$',
          'The rank inequality $\\text{Rank}(AB) \\leq \\min(\\text{Rank}(A), \\text{Rank}(B))$ follows directly from the same factoring argument',
          'In quantum information, factoring rank bounds the complexity of entangled states',
        ],
      },
      resources: [
        {
          title: 'Rank-nullity theorem and proofs',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=7UJ4CFRGd-U',
          durationMinutes: 48,
          description: 'Strang on the fundamental theorem of linear algebra connecting row and column spaces.',
        },
        {
          title: 'Low rank approximations',
          channel: 'Mutual Information',
          url: 'https://www.youtube.com/watch?v=nbBvuuNVfco',
          durationMinutes: 14,
          description: 'Why the rank of a matrix controls how compressible the data it encodes really is.',
        },
      ],
      quiz: [
        {
          id: '5-4-q1',
          type: 'multiple-choice',
          question: 'If $C = AB$ where $A$ is $5 \\times 2$ and $B$ is $2 \\times 7$, what can you conclude about $\\text{Rank}(C)$?',
          options: ['$\\text{Rank}(C) = 2$', '$\\text{Rank}(C) \\leq 2$', '$\\text{Rank}(C) \\geq 2$', '$\\text{Rank}(C) = 5$'],
          correctAnswer: 1,
          explanation: 'This is a $2$-factoring of $C$. By Lemma 5.6, $\\text{Rank}(C) \\leq 2$. (The rank could be less if the columns of $A$ are dependent or $B$ has a null space.)',
        },
        {
          id: '5-4-q2',
          type: 'true-false',
          question: '$\\text{Rank}(AB) \\leq \\min(\\text{Rank}(A), \\text{Rank}(B))$ for all matrices $A, B$ with compatible dimensions.',
          correctAnswer: true,
          explanation: '$AB$ is a $\\text{Rank}(B)$-factoring relative to $A$, giving $\\text{Rank}(AB) \\leq \\text{Rank}(A)$. By the Row Rank Theorem applied symmetrically, $\\text{Rank}(AB) \\leq \\text{Rank}(B)$ as well.',
        },
      ],
      commonMistakes: [
        'Assuming a $q$-factoring implies $\\text{Rank}(C) = q$ — the lemma only gives an upper bound.',
        'Forgetting to reverse the order when transposing a product: $(AB)^t = B^t A^t$, not $A^t B^t$.',
      ],
    },
    {
      id: '5-5',
      chapterId: '5',
      sectionNumber: '5.5',
      title: 'Triple Products and the Row Perspective',
      estimatedMinutes: 8,
      plainEnglish: [
        'Given an $m \\times n$ matrix $A$, a vector $\\mathbf{x} \\in \\mathbb{R}^n$, and a vector $\\mathbf{y} \\in \\mathbb{R}^m$, the expression $\\mathbf{y}^t A \\mathbf{x}$ is a product of three matrices: a $1 \\times m$, an $m \\times n$, and an $n \\times 1$. The result is a $1 \\times 1$ matrix — just a real number.',
        'Expanding, $\\mathbf{y}^t A \\mathbf{x} = \\sum_{i,j} y_i a_{ij} x_j$. Since transposing a $1 \\times 1$ matrix does nothing, we also have $\\mathbf{y}^t A \\mathbf{x} = \\mathbf{x}^t A^t \\mathbf{y}$. This symmetry is surprisingly useful.',
        'The expression $A^t \\mathbf{y}$ also has a clean row interpretation: the $i$-th entry of $A^t \\mathbf{y}$ is the dot product of the $i$-th column of $A$ with $\\mathbf{y}$. This bridges the column and row perspectives of a linear map.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 5.9',
          title: 'Triple Product',
          content: 'For $A \\in \\mathbb{R}^{m \\times n}$, $\\mathbf{x} \\in \\mathbb{R}^n$, $\\mathbf{y} \\in \\mathbb{R}^m$, the **triple product** $\\mathbf{y}^t A \\mathbf{x} \\in \\mathbb{R}$ is defined as the scalar $\\sum_{i,j} y_i a_{ij} x_j$.',
        },
        {
          type: 'remark',
          label: 'Remark 5.10',
          content: 'Since the result is a $1 \\times 1$ matrix and $(1 \\times 1)^t = 1 \\times 1$, we get the symmetry identity: $$\\mathbf{y}^t A \\mathbf{x} = \\mathbf{x}^t A^t \\mathbf{y}$$ Furthermore, $(A^t \\mathbf{y})_i = \\mathbf{a}_i \\cdot \\mathbf{y}$ where $\\mathbf{a}_i$ is the $i$-th column of $A$.',
        },
      ],
      whyItMatters: {
        context: 'Triple products appear in variational calculus, optimization, and any setting where you measure the output of a linear map against a target.',
        applications: [
          'Quadratic forms $\\mathbf{x}^t M \\mathbf{x}$ (a triple product with $\\mathbf{y} = \\mathbf{x}$) define energy, variance, and curvature in physics and statistics',
          'The gradient of $\\mathbf{y}^t A \\mathbf{x}$ with respect to $\\mathbf{x}$ is $A^t \\mathbf{y}$ — a formula used in every backpropagation derivation',
          'In signal processing, matched filters use the triple product structure to detect signals in noise',
        ],
      },
      resources: [
        {
          title: 'Quadratic forms and symmetric matrices',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=ZTNniGvY5IQ',
          durationMinutes: 40,
          description: 'Strang on quadratic forms, which are the main application of triple products.',
        },
        {
          title: 'Matrix calculus for deep learning',
          channel: 'fast.ai',
          url: 'https://www.youtube.com/watch?v=q8SA3rM6ckI',
          durationMinutes: 18,
          description: 'How triple products and transpose appear in gradient computations for neural networks.',
        },
      ],
      quiz: [
        {
          id: '5-5-q1',
          type: 'true-false',
          question: 'For any $A$, $\\mathbf{x}$, $\\mathbf{y}$ of compatible sizes, $\\mathbf{y}^t A \\mathbf{x} = \\mathbf{x}^t A^t \\mathbf{y}$.',
          correctAnswer: true,
          explanation: 'Both sides equal the same scalar. The left side is a $1\\times 1$ matrix, and transposing a $1 \\times 1$ matrix is itself, giving $\\mathbf{y}^t A \\mathbf{x} = (\\mathbf{y}^t A \\mathbf{x})^t = \\mathbf{x}^t A^t \\mathbf{y}$.',
        },
        {
          id: '5-5-q2',
          type: 'multiple-choice',
          question: 'What is the $i$-th entry of $A^t \\mathbf{y}$?',
          options: [
            'The dot product of the $i$-th row of $A$ with $\\mathbf{y}$',
            'The dot product of the $i$-th column of $A$ with $\\mathbf{y}$',
            'The $i$-th entry of $A\\mathbf{y}$',
            'The sum of all entries in $\\mathbf{y}$',
          ],
          correctAnswer: 1,
          explanation: 'The $i$-th column of $A$ is the $i$-th row of $A^t$. So $(A^t \\mathbf{y})_i = (i\\text{-th row of } A^t) \\cdot \\mathbf{y} = (i\\text{-th column of } A) \\cdot \\mathbf{y}$.',
        },
      ],
      commonMistakes: [
        'Confusing $\\mathbf{y}^t A \\mathbf{x}$ with $\\mathbf{y}^t (A \\mathbf{x})$ vs $(\\mathbf{y}^t A) \\mathbf{x}$ — by associativity of matrix multiplication, these are the same scalar.',
        'Forgetting the transpose flips when applying the symmetry: $\\mathbf{y}^t A \\mathbf{x} = \\mathbf{x}^t A^t \\mathbf{y}$, not $\\mathbf{x}^t A \\mathbf{y}$.',
      ],
    },
    {
      id: '5-6',
      chapterId: '5',
      sectionNumber: '5.6',
      title: 'Linear Systems Revisited via Row Rank',
      estimatedMinutes: 10,
      plainEnglish: [
        'With the Row Rank Theorem in hand, we can revisit solvability from a row perspective. Think of each equation in the system $A\\mathbf{x} = \\mathbf{b}$ as one row of $A$ paired with one entry of $\\mathbf{b}$. Adding an equation is adding a row.',
        'The system is always solvable (for every possible $\\mathbf{b}$) if and only if $\\text{Rank}(A) = m$. By the Row Rank Theorem, this means the row vectors of $A$ are linearly independent — no equation is a redundant combination of others.',
        'Similarly, the dimension of the solution set is $n - \\text{Rank}(A)$. Using the Row Rank Theorem, this equals $n - \\text{Rank}(A^t)$. We started in $\\mathbb{R}^n$ and each new linearly-independent row reduces the solution dimension by 1, exactly as our geometric intuition from Chapter 1 suggested.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 5.11',
          title: 'Always Solvable via Row Rank',
          content: 'Let $A$ be an $m \\times n$ matrix. Then $A\\mathbf{x} = \\mathbf{b}$ is solvable for every $\\mathbf{b} \\in \\mathbb{R}^m$ if and only if the row vectors of $A$ are linearly independent.',
          note: 'Proof: always solvable iff $\\text{Rank}(A) = m$. By the Row Rank Theorem, $\\text{Rank}(A) = \\text{Rank}(A^t) = m$ iff the columns of $A^t$ (= rows of $A$) are linearly independent.',
        },
        {
          type: 'theorem',
          label: 'Theorem 5.12',
          title: 'Solution Dimension via Row Rank',
          content: 'If $A\\mathbf{x} = \\mathbf{b}$ is solvable, its solution set is an affine space of dimension $$n - \\text{Rank}(A) = n - \\text{Rank}(A^t) = n - \\text{Rowrank}(A).$$ Each linearly independent row reduces the solution dimension by exactly $1$.',
        },
      ],
      whyItMatters: {
        context: 'Understanding solvability through rows gives direct geometric insight — each equation is a hyperplane constraint.',
        applications: [
          'Network flow problems: each conservation law is a row; the system is solvable iff the laws are independent',
          'Overdetermined systems ($m > n$) almost never have exact solutions — motivating least squares regression',
          'Circuit analysis (Kirchhoff\'s laws) gives one equation per node/loop; linear independence of those equations determines the circuit\'s degrees of freedom',
        ],
      },
      resources: [
        {
          title: 'Complete solution to linear equations',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=9Q1q7s1jTzU',
          durationMinutes: 47,
          description: 'Strang connects rank to solvability and the dimension of the solution set.',
        },
        {
          title: 'The four fundamental subspaces',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=nHlE7EgJFds',
          durationMinutes: 49,
          description: 'How row space and column space together govern the full structure of linear systems.',
        },
      ],
      quiz: [
        {
          id: '5-6-q1',
          type: 'multiple-choice',
          question: 'A $3 \\times 5$ matrix $A$ has linearly independent rows. For how many right-hand sides $\\mathbf{b} \\in \\mathbb{R}^3$ is $A\\mathbf{x} = \\mathbf{b}$ solvable?',
          options: ['None', 'Finitely many', 'All', 'Only $\\mathbf{b} = \\mathbf{0}$'],
          correctAnswer: 2,
          explanation: 'Linearly independent rows means $\\text{Rank}(A) = 3 = m$, so the system is always solvable — for every $\\mathbf{b} \\in \\mathbb{R}^3$.',
        },
        {
          id: '5-6-q2',
          type: 'multiple-choice',
          question: 'If $A$ is $3 \\times 5$ with $\\text{Rank}(A) = 3$, what is the dimension of the solution set of $A\\mathbf{x} = \\mathbf{b}$ (when it exists)?',
          options: ['$0$', '$2$', '$3$', '$5$'],
          correctAnswer: 1,
          explanation: 'Solution dimension = $n - \\text{Rank}(A) = 5 - 3 = 2$. There are 2 free variables.',
        },
      ],
      commonMistakes: [
        'Thinking more rows always means a harder system — only linearly independent rows reduce the solution space.',
        'Confusing the condition for a unique solution ($\\text{Rank}(A) = n$) with the condition for always solvable ($\\text{Rank}(A) = m$).',
        'Forgetting that $n - \\text{Rank}(A)$ counts free variables even in inhomogeneous systems — the solution set has the same dimension as the null space.',
      ],
    },
    {
      id: '5-7',
      chapterId: '5',
      sectionNumber: '5.7',
      title: 'Hyperplane Intersections',
      estimatedMinutes: 8,
      plainEnglish: [
        'Each equation $a_{i1} x_1 + \\cdots + a_{in} x_n = b_i$ defines a hyperplane in $\\mathbb{R}^n$ — a flat $(n-1)$-dimensional slice. Adding more equations means intersecting more hyperplanes.',
        'When we add a new equation (a new row), one of three things happens: (1) the new row\'s vector is **not** in the span of the previous rows — then the solution space dimension drops by 1 (a genuine new constraint); (2) the new row is in the span of the previous rows and is consistent — the equation is redundant and the solution space is unchanged; (3) the new row is in the span of the previous rows but is inconsistent — the hyperplane misses the current solution set entirely (no solution).',
        'This trichotomy exactly matches what we saw in Chapter 1 when studying two or three equations: the lines or planes either intersect transversally, overlap, or are parallel. Row rank gives us the rigorous version of that intuition for any number of equations in any dimension.',
      ],
      formalView: [
        {
          type: 'remark',
          label: 'Remark 5.13',
          title: 'Hyperplane Intersection Trichotomy',
          content: 'Let $S$ be the current solution set (an affine space) and let a new equation add a row $\\mathbf{r}^t$ with right-hand side $c$. Then:\\begin{itemize} \\item If $\\mathbf{r}$ is NOT in the row span of the previous rows: the solution space dimension decreases by $1$. \\item If $\\mathbf{r}$ IS in the row span and the equation is **consistent**: the equation is redundant — solution space unchanged. \\item If $\\mathbf{r}$ IS in the row span and the equation is **inconsistent**: the hyperplane misses $S$ — no solution. \\end{itemize}',
        },
      ],
      whyItMatters: {
        context: 'Hyperplane intersection is the geometric heart of all systems of linear equations.',
        applications: [
          'Linear programming: the feasible region of an LP is an intersection of half-spaces, and its vertices are intersections of boundary hyperplanes',
          'Computer graphics: ray-plane intersection and clipping algorithms rely on this geometry',
          'Statistics: each data constraint reduces the dimension of the parameter space by one when the constraint is independent',
        ],
      },
      resources: [
        {
          title: 'Geometry of linear equations',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=uQhTuRlWMxw',
          durationMinutes: 10,
          description: 'Visual intuition for how equations constrain solution spaces.',
        },
        {
          title: 'Solving Ax = b',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=9Q1q7s1jTzU',
          durationMinutes: 47,
          description: 'Complete discussion of when linear systems have solutions and the geometry of solution sets.',
        },
      ],
      quiz: [
        {
          id: '5-7-q1',
          type: 'multiple-choice',
          question: 'You have a system in $\\mathbb{R}^4$ with solution set of dimension 2. You add a new equation. What are the possible dimensions of the new solution set?',
          options: ['Only 1', 'Only 2', '1 or 2', '0, 1, or 2'],
          correctAnswer: 2,
          explanation: 'If the new row is independent of the previous ones, dimension drops to 1. If the row is dependent and consistent, dimension stays at 2. The system cannot gain dimension by adding equations. Inconsistency would mean no solution (not a finite dimension).',
        },
        {
          id: '5-7-q2',
          type: 'true-false',
          question: 'Adding a redundant (linearly dependent) equation to a consistent system can never change its solution set.',
          correctAnswer: false,
          explanation: 'A dependent row that is also *inconsistent* with the current solution will result in no solution. Redundancy alone does not guarantee consistency — the right-hand side also matters.',
        },
      ],
      commonMistakes: [
        'Assuming a linearly dependent row is automatically redundant — it could also be inconsistent, killing all solutions.',
        'Thinking dimension can increase when you add more equations — more constraints can only maintain or reduce the solution dimension.',
      ],
    },
  ],
};

export default chapter5;
