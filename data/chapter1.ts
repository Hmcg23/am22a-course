import type { ChapterMeta } from './types';

const chapter1: ChapterMeta = {
  id: '1',
  title: 'Linear Systems',
  subtitle: 'Geometry, Structure, and Solution Methods',
  description: 'Discover how systems of equations encode geometry, develop powerful elimination algorithms, and reveal the deep structure of solution sets.',
  color: 'blue',
  accentHex: '#3B82F6',
  sections: [
    {
      id: '1-1',
      chapterId: '1',
      sectionNumber: '1.1',
      title: 'Linear Equations in Two Variables',
      estimatedMinutes: 8,
      plainEnglish: [
        'A **linear equation** in two variables is the simplest kind of constraint you can put on two quantities: you take each variable, multiply it by a fixed number (its coefficient), add them up, and set the result equal to some target value. For example, $7x_1 - x_2 = -2$ says: "take seven times the first quantity, subtract the second, and you get negative two."',
        'The word **linear** is key — it rules out squares ($x_1^2$), products ($x_1 x_2$), reciprocals ($1/x_1$), and all other nonlinear combinations. Only weighted sums are allowed. This restriction might seem severe, but it\'s exactly what makes linear equations so tractable and geometrically clean.',
        'The general form is $a_1 x_1 + a_2 x_2 + \\cdots + a_n x_n = b$, where the $a_i$ are the **coefficients** and $b$ is the **right-hand side (RHS)**. At least one coefficient must be nonzero for the equation to be meaningful.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 1.1',
          title: 'Linear Equation',
          content: 'A **linear equation** in variables $x_1, x_2, \\ldots, x_n$ has the form $$a_1 x_1 + a_2 x_2 + \\cdots + a_n x_n = b$$ where $a_1, \\ldots, a_n, b \\in \\mathbb{R}$ and not all $a_i$ are zero. The $a_i$ are called **coefficients** and $b$ is the **right-hand side**.',
          note: 'Terms like $x_1 x_2$, $x_1^3$, $\\sin(x_1)$, $1/x_1$ are all forbidden — they make the equation nonlinear.',
        },
      ],
      whyItMatters: {
        context: 'Linear equations appear everywhere physical laws are expressed as constraints between quantities.',
        applications: [
          'Kirchhoff\'s voltage law gives a linear equation relating currents in a circuit',
          'Chemical stoichiometry requires balanced equations — linear constraints on molecular counts',
          'Economics uses linear budget constraints and supply-demand equations',
          'Every pixel in a CT scan image satisfies a linear equation relating X-ray absorption',
        ],
      },
      resources: [
        {
          title: 'Introduction to Linear Algebra',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=ZK3O402wf1c',
          durationMinutes: 39,
          description: 'Gilbert Strang\'s opening lecture on the geometry of linear equations.',
        },
        {
          title: 'Linear equations in two variables',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=MXV65i9g1Xg',
          durationMinutes: 10,
          description: 'Building intuition for what a linear equation means.',
        },
      ],
      quiz: [
        {
          id: '1-1-q1',
          type: 'multiple-choice',
          question: 'Which of the following is a linear equation?',
          options: [
            '$x_1^2 + x_2 = 5$',
            '$3x_1 - 2x_2 + x_3 = 7$',
            '$x_1 x_2 = 4$',
            '$\\sqrt{x_1} = 3$',
          ],
          correctAnswer: 1,
          explanation: 'Only $3x_1 - 2x_2 + x_3 = 7$ has the form of a sum of terms, each a constant times one variable. The others involve powers, products, or roots.',
        },
        {
          id: '1-1-q2',
          type: 'true-false',
          question: 'The equation $0 \\cdot x_1 + 5x_2 = 3$ is a valid linear equation.',
          correctAnswer: true,
          explanation: 'Yes — having one coefficient equal to zero is fine as long as not all coefficients are zero. Here $a_2 = 5 \\neq 0$.',
        },
      ],
      commonMistakes: [
        'Confusing "linear" (no powers, products, or functions) with "linear function" in the calculus sense.',
        'Thinking a zero coefficient invalidates the equation — $0 \\cdot x_1 + 3x_2 = 5$ is perfectly valid.',
        'Forgetting that the RHS $b$ can be any real number, including zero.',
      ],
    },
    {
      id: '1-2',
      chapterId: '1',
      sectionNumber: '1.2',
      title: 'Solutions as Geometric Objects',
      estimatedMinutes: 10,
      plainEnglish: [
        'A **solution** to a linear equation is a specific assignment of values to the variables that makes the equation true. For the equation $7x_1 - x_2 = -2$, the pair $(x_1, x_2) = (0, 2)$ is a solution because $7(0) - 2 = -2$. So is $(1, 9)$, $(−1, −5)$, and infinitely many other pairs.',
        'Here\'s the geometric insight: **all solutions to a single linear equation in two variables form a line in the plane**. This isn\'t a coincidence — it\'s the fundamental geometric content of linearity. The equation constrains one degree of freedom, leaving exactly one free.',
        'More generally, a single linear equation in $n$ variables defines a **hyperplane** in $\\mathbb{R}^n$: a line when $n=2$, a plane when $n=3$, and a flat $(n-1)$-dimensional object for larger $n$. The solution set is always one dimension below the full space.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 1.2',
          title: 'Solution Set',
          content: 'A **solution** to the equation $a_1 x_1 + \\cdots + a_n x_n = b$ is a tuple $(s_1, \\ldots, s_n)$ such that $a_1 s_1 + \\cdots + a_n s_n = b$. The **solution set** $L$ is the set of all solutions: $$L = \\{(x_1,\\ldots,x_n) \\in \\mathbb{R}^n : a_1 x_1 + \\cdots + a_n x_n = b\\}$$',
        },
        {
          type: 'theorem',
          label: 'Theorem 1.2',
          title: 'Solution Sets are Hyperplanes',
          content: 'The solution set of a single nontrivial linear equation $a_1 x_1 + \\cdots + a_n x_n = b$ in $\\mathbb{R}^n$ is a **(affine) hyperplane** of dimension $n - 1$. In particular, for $n = 2$ it is a line, and for $n = 3$ it is a plane.',
        },
      ],
      diagram: {
        type: 'LineSlider',
        props: { defaultA: 7, defaultB: -1, defaultC: -2 },
      },
      whyItMatters: {
        context: 'Geometry gives us a way to think about equations without computing — we can see solution structure at a glance.',
        applications: [
          'Reading a budget constraint $px + qy = M$ as a line reveals all affordable bundles instantly',
          'Visualizing sensor constraints in robotics as hyperplanes helps reason about feasible configurations',
          'In machine learning, a linear classifier is literally a hyperplane separating data',
        ],
      },
      resources: [
        {
          title: 'Vectors, what even are they?',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs',
          durationMinutes: 9,
          description: 'Beautiful geometric intuition for vectors and the plane they live in.',
        },
        {
          title: 'Linear equations and their solutions',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=9IUEk9fn2Vs',
          durationMinutes: 8,
          description: 'Plotting solution sets of linear equations.',
        },
      ],
      quiz: [
        {
          id: '1-2-q1',
          type: 'multiple-choice',
          question: 'The solution set of a single linear equation $3x_1 + 2x_2 = 6$ in $\\mathbb{R}^2$ is:',
          options: ['A single point', 'A line', 'A plane', 'All of $\\mathbb{R}^2$'],
          correctAnswer: 1,
          explanation: 'One nontrivial equation in two variables always gives a line — it removes one degree of freedom from the plane.',
        },
        {
          id: '1-2-q2',
          type: 'true-false',
          question: 'The point $(2, 9)$ is a solution to $7x_1 - x_2 = 5$.',
          correctAnswer: true,
          explanation: '$7(2) - 9 = 14 - 9 = 5$. Yes, $(2, 9)$ satisfies the equation.',
        },
      ],
      commonMistakes: [
        'Thinking solutions are isolated points — for a single equation in two variables, there are always infinitely many.',
        'Plotting only integer solutions — the solution line contains infinitely many non-integer points.',
        'Confusing the solution set (a subset of $\\mathbb{R}^n$) with the equation itself.',
      ],
    },
    {
      id: '1-3',
      chapterId: '1',
      sectionNumber: '1.3',
      title: 'Scalar Multiples and Equation Equivalence',
      estimatedMinutes: 7,
      plainEnglish: [
        'Two equations are **equivalent** if they have exactly the same solution set. One key way to produce an equivalent equation is to multiply both sides by a nonzero constant $k$. For example, $x_1 + 2x_2 = 5$ and $3x_1 + 6x_2 = 15$ (multiply by 3) describe identical lines.',
        'This is not just algebra bookkeeping — it matters because Gaussian elimination relies on multiplying equations by scalars and adding them together. Knowing these operations preserve solutions is the entire justification for the algorithm.',
        'Multiplying by **zero** is forbidden: $0 = 0$ is true for all $(x_1, x_2)$ and gives no information. Multiplying by a negative number is fine — it just flips the sign of every term.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 1.3',
          title: 'Scalar Multiples Preserve Solutions',
          content: 'If $(s_1, \\ldots, s_n)$ is a solution to $a_1 x_1 + \\cdots + a_n x_n = b$, and $k \\neq 0$, then $(s_1, \\ldots, s_n)$ is also a solution to $(ka_1) x_1 + \\cdots + (ka_n) x_n = kb$. The two equations have identical solution sets.',
        },
        {
          type: 'example',
          label: 'Example 1.3',
          content: 'The equations $x_1 + 2x_2 = 5$ and $-2x_1 - 4x_2 = -10$ are equivalent (multiply by $-2$). Both describe the same line in $\\mathbb{R}^2$.',
        },
      ],
      whyItMatters: {
        context: 'This theorem is the theoretical backbone of Gaussian elimination.',
        applications: [
          'Row scaling in elimination algorithms is justified by this theorem',
          'Normalizing equations (e.g., making leading coefficient 1) preserves the solution set',
          'In numerical computing, row scaling improves numerical stability',
        ],
      },
      resources: [
        {
          title: 'Row reduction and echelon forms',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=QVKj3LADCnA',
          durationMinutes: 47,
          description: 'Gilbert Strang on elimination and row operations.',
        },
      ],
      quiz: [
        {
          id: '1-3-q1',
          type: 'true-false',
          question: 'Multiplying an equation by $-3$ changes its solution set.',
          correctAnswer: false,
          explanation: 'Multiplying by any nonzero constant preserves the solution set exactly. Only multiplication by zero would destroy information.',
        },
        {
          id: '1-3-q2',
          type: 'multiple-choice',
          question: 'Which equation is equivalent to $2x_1 - 4x_2 = 8$?',
          options: ['$x_1 - 2x_2 = 8$', '$x_1 - 2x_2 = 4$', '$4x_1 - 8x_2 = 8$', '$2x_1 - 4x_2 = 0$'],
          correctAnswer: 1,
          explanation: 'Dividing by 2 gives $x_1 - 2x_2 = 4$. The RHS must also be divided.',
        },
      ],
      commonMistakes: [
        'Multiplying only the left-hand side by $k$ and forgetting the right-hand side.',
        'Multiplying by zero — this destroys all information and gives a trivially true $0=0$.',
      ],
    },
    {
      id: '1-4',
      chapterId: '1',
      sectionNumber: '1.4',
      title: 'Exceptional Behavior: When Coefficients Vanish',
      estimatedMinutes: 8,
      plainEnglish: [
        'Most linear equations behave predictably — they define a hyperplane. But two special cases arise when the equation degenerates.',
        'First: if **all** coefficients are zero but the RHS is nonzero, we get $0 = b$ with $b \\neq 0$. This is a **contradiction** — no values of the variables can satisfy it. The solution set is the **empty set** $\\emptyset$.',
        'Second: if all coefficients are zero **and** the RHS is zero, we get $0 = 0$. This is a **tautology** — every tuple $(x_1, \\ldots, x_n)$ satisfies it. The solution set is all of $\\mathbb{R}^n$.',
        'These degenerate cases occur during Gaussian elimination when a row of the matrix becomes all zeros. Recognizing them is critical for determining how many solutions a system has.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 1.4',
          title: 'Degenerate Cases',
          content: 'For the equation $0 \\cdot x_1 + 0 \\cdot x_2 + \\cdots + 0 \\cdot x_n = b$: \\begin{itemize} \\item If $b \\neq 0$: the solution set is $\\emptyset$ (no solutions — contradiction). \\item If $b = 0$: the solution set is $\\mathbb{R}^n$ (all tuples — tautology). \\end{itemize}',
        },
      ],
      whyItMatters: {
        context: 'Degenerate cases reveal whether a system is inconsistent or under-determined.',
        applications: [
          'During Gaussian elimination, a zero row with nonzero RHS immediately signals no solution',
          'A zero row with zero RHS means the system has one fewer effective equation than expected',
          'These cases determine whether engineering systems have solutions, are over-constrained, or have free parameters',
        ],
      },
      resources: [
        {
          title: 'Inconsistent and dependent systems',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=DOiGEfFGMEs',
          durationMinutes: 12,
          description: 'When linear systems have no solution or infinitely many solutions.',
        },
      ],
      quiz: [
        {
          id: '1-4-q1',
          type: 'multiple-choice',
          question: 'What is the solution set of $0x_1 + 0x_2 = 5$?',
          options: ['$\\{(0, 0)\\}$', '$\\mathbb{R}^2$', '$\\emptyset$', 'The line $x_2 = 5$'],
          correctAnswer: 2,
          explanation: 'No values of $x_1, x_2$ can make $0 = 5$ true. The solution set is empty.',
        },
        {
          id: '1-4-q2',
          type: 'true-false',
          question: 'The equation $0x_1 + 0x_2 = 0$ is satisfied by every point in $\\mathbb{R}^2$.',
          correctAnswer: true,
          explanation: 'Since $0 = 0$ is always true regardless of the values of $x_1$ and $x_2$, every point satisfies this equation.',
        },
      ],
      commonMistakes: [
        'Forgetting that $0 = 0$ is a tautology (provides no constraint) while $0 = c$ for $c \\neq 0$ is a contradiction.',
        'During elimination, discarding zero rows without checking whether the RHS is also zero.',
      ],
    },
    {
      id: '1-5',
      chapterId: '1',
      sectionNumber: '1.5',
      title: 'Linear Systems and Line Intersections',
      estimatedMinutes: 12,
      plainEnglish: [
        'A **linear system** is a collection of linear equations that must all hold simultaneously. Finding a solution means finding a point (or set of points) that satisfies every equation at once.',
        'Geometrically, each equation in two variables defines a line. A solution to the system is a point that lies on **all** those lines simultaneously — i.e., a point of intersection.',
        'Two lines in the plane can relate in exactly three ways: they intersect at **one point** (unique solution), they are **parallel** but distinct (no solution), or they are **the same line** (infinitely many solutions). This trichotomy is the heart of what it means to solve a linear system.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 1.5',
          title: 'Linear System',
          content: 'A **linear system** is a finite set of linear equations in variables $x_1, \\ldots, x_n$: $$\\begin{cases} a_{11}x_1 + \\cdots + a_{1n}x_n = b_1 \\\\ a_{21}x_1 + \\cdots + a_{2n}x_n = b_2 \\\\ \\vdots \\\\ a_{m1}x_1 + \\cdots + a_{mn}x_n = b_m \\end{cases}$$ A **solution** is a tuple $(s_1, \\ldots, s_n)$ satisfying all $m$ equations simultaneously.',
        },
        {
          type: 'theorem',
          label: 'Theorem 1.5',
          title: 'Trichotomy of Solutions',
          content: 'Every linear system has exactly one of three possible outcomes: \\begin{itemize} \\item Exactly **one** solution \\item **No** solution (inconsistent) \\item **Infinitely many** solutions \\end{itemize}',
          note: 'There is never a system with exactly two or exactly three solutions.',
        },
      ],
      diagram: {
        type: 'LineIntersection',
        props: {
          systems: [
            { label: 'One solution', equations: [[1, 1, 3], [1, -1, 1]], type: 'unique' },
            { label: 'No solutions', equations: [[1, 2, 4], [1, 2, 7]], type: 'none' },
            { label: 'Infinitely many', equations: [[2, 4, 8], [1, 2, 4]], type: 'infinite' },
          ],
        },
      },
      whyItMatters: {
        context: 'The trichotomy theorem tells us there are only three possible outcomes when solving any linear system — a fundamental structural result.',
        applications: [
          'CT scan reconstruction: a system with a unique solution means the image can be fully recovered',
          'Traffic flow models: infinitely many solutions arise when roads form loops',
          'Chemical equilibria: the number of solutions determines whether a reaction is uniquely determined',
        ],
      },
      resources: [
        {
          title: 'Linear algebra: Chapter 1 overview',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=kjBOesZCoqc',
          durationMinutes: 16,
          description: 'Geometric intuition for systems of linear equations and their solutions.',
        },
        {
          title: 'Systems of equations with two variables',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=nok99JOhcjo',
          durationMinutes: 15,
          description: 'Three cases: one solution, no solution, infinite solutions.',
        },
      ],
      quiz: [
        {
          id: '1-5-q1',
          type: 'multiple-choice',
          question: 'A linear system can have exactly how many solutions?',
          options: ['0, 1, 2, or infinitely many', '0, 1, or infinitely many', 'Only 0 or infinitely many', 'Any finite number'],
          correctAnswer: 1,
          explanation: 'The trichotomy theorem: exactly zero, one, or infinitely many. A system with two solutions is impossible.',
        },
        {
          id: '1-5-q2',
          type: 'true-false',
          question: 'Two equations that define the same line form a system with infinitely many solutions.',
          correctAnswer: true,
          explanation: 'If both equations describe the same geometric line, every point on that line is a solution — infinitely many.',
        },
      ],
      commonMistakes: [
        'Thinking a system with 3 equations and 2 unknowns "should" have a solution — it may be inconsistent.',
        'Confusing "no solution" (inconsistent) with "infinitely many solutions" — both are non-unique but very different.',
      ],
    },
    {
      id: '1-6',
      chapterId: '1',
      sectionNumber: '1.6',
      title: 'Geometry of Intersecting Lines',
      estimatedMinutes: 10,
      plainEnglish: [
        'The three cases of the trichotomy have precise geometric descriptions. When two lines in $\\mathbb{R}^2$ **cross at a single point**, that point is the unique solution. You can find it algebraically by solving the system.',
        'When the lines are **parallel** (same slope, different intercept), they never meet. The system is inconsistent and has no solution. This happens algebraically when elimination produces a row $0 = c$ with $c \\neq 0$.',
        'When the two equations describe **the same line**, every point on that line is a solution. The system is under-determined: one equation is redundant. Algebraically, elimination produces a row $0 = 0$.',
        'The slope of a line $a_1 x_1 + a_2 x_2 = b$ is $-a_1/a_2$. Two lines are parallel exactly when they have the same slope, i.e., the same ratio $a_1 : a_2$.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 1.6',
          title: 'Consistent and Inconsistent Systems',
          content: 'A linear system is **consistent** if it has at least one solution. It is **inconsistent** if it has no solution.',
        },
        {
          type: 'remark',
          label: 'Remark 1.6',
          content: 'For two equations in two unknowns, the system $\\begin{pmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{pmatrix} \\mathbf{x} = \\begin{pmatrix} c_1 \\\\ c_2 \\end{pmatrix}$ has a unique solution when $a_1 b_2 - a_2 b_1 \\neq 0$ (the lines are not parallel). This expression is the **determinant** — a concept we will study in depth later.',
        },
      ],
      whyItMatters: {
        context: 'Geometric reasoning reveals at a glance whether a system is solvable, saving computation.',
        applications: [
          'Computer vision: finding where two camera rays intersect requires solving a 2-variable linear system',
          'Game physics: collision detection solves line intersection problems in real time',
          'Surveying: triangulation finds a point by intersecting lines from known reference positions',
        ],
      },
      resources: [
        {
          title: 'Solving linear systems graphically',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=vA-55wZtLeE',
          durationMinutes: 10,
          description: 'Graphical interpretation of linear system solutions.',
        },
      ],
      quiz: [
        {
          id: '1-6-q1',
          type: 'multiple-choice',
          question: 'The system $x_1 + x_2 = 3$ and $2x_1 + 2x_2 = 6$ has:',
          options: ['One solution', 'No solution', 'Infinitely many solutions', 'Exactly two solutions'],
          correctAnswer: 2,
          explanation: 'The second equation is twice the first — they describe the same line. Every point on $x_1 + x_2 = 3$ is a solution.',
        },
      ],
      commonMistakes: [
        'Assuming parallel lines (same ratio of coefficients) means no solution — must also check if they are actually different lines.',
        'Thinking coincident lines (same equation, scaled) have a "less valid" solution than a unique intersection.',
      ],
    },
    {
      id: '1-7',
      chapterId: '1',
      sectionNumber: '1.7',
      title: 'Three Types of Exceptional Cases',
      estimatedMinutes: 8,
      plainEnglish: [
        'There are three qualitatively different exceptional situations that arise in linear systems, each corresponding to a different geometric configuration.',
        '**Exception 1:** The system has no solution (inconsistent). Geometrically: the lines/planes are parallel but do not coincide. Algebraically: elimination produces $0 = c$ with $c \\neq 0$.',
        '**Exception 2:** The system has infinitely many solutions because one equation is a redundant consequence of others. Geometrically: coincident lines. Algebraically: elimination produces $0 = 0$.',
        '**Exception 3:** More subtle — the system has a unique solution or is inconsistent due to equations that are not obviously redundant but encode a hidden dependency. For example, three planes in $\\mathbb{R}^3$ might have no common point even though each pair of planes intersects.',
        'Understanding which exception you have is the first step to understanding the structure of the solution set.',
      ],
      formalView: [
        {
          type: 'remark',
          label: 'Remark 1.7',
          title: 'The Three Exceptional Behaviors',
          content: 'During Gaussian elimination, we detect exceptions by the form of the final row: \\begin{itemize} \\item Row $[0, 0, \\ldots, 0 \\mid c]$ with $c \\neq 0 \\Rightarrow$ **no solution**. \\item Row $[0, 0, \\ldots, 0 \\mid 0] \\Rightarrow$ **redundant equation**, solution set has higher dimension than expected. \\item No zero row $\\Rightarrow$ **unique solution** (when $m = n$) or expected dimension. \\end{itemize}',
        },
      ],
      whyItMatters: {
        context: 'Recognizing exceptional behavior early in elimination saves computation and reveals system structure.',
        applications: [
          'In robotics, a redundant constraint means the robot has more freedom of motion than designed',
          'In network analysis, a linearly dependent set of loop equations reveals redundant wiring',
          'In statistics, collinear predictors in regression reveal exceptional behavior in the normal equations',
        ],
      },
      resources: [
        {
          title: 'Elimination with matrices',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=QVKj3LADCnA',
          durationMinutes: 47,
          description: 'Gilbert Strang on recognizing failure modes during elimination.',
        },
      ],
      quiz: [
        {
          id: '1-7-q1',
          type: 'multiple-choice',
          question: 'During elimination, you reach the row $[0, 0, 0 \\mid 7]$. This means:',
          options: ['The system has a unique solution', 'The system has infinitely many solutions', 'The system has no solution', 'There is a free variable'],
          correctAnswer: 2,
          explanation: 'A row $[0, \\ldots, 0 \\mid c]$ with $c \\neq 0$ says $0 = 7$, which is impossible. No solution exists.',
        },
      ],
      commonMistakes: [
        'Confusing a zero row with zero RHS (infinitely many solutions) vs. nonzero RHS (no solution).',
        'Assuming "exceptional" means rare — these cases are common in applications with physical constraints.',
      ],
    },
    {
      id: '1-8',
      chapterId: '1',
      sectionNumber: '1.8',
      title: 'Solution Space Shape, Affine Sets, and Dimension',
      estimatedMinutes: 12,
      plainEnglish: [
        'Once we know a system is consistent, the next question is: **what does the solution set look like?** The answer is always an **affine set** — a flat, shifted version of a subspace.',
        'For a system of $m$ equations in $n$ unknowns with rank $r$ (the effective number of constraints), the solution set has dimension $n - r$. When no exceptional behavior occurs, $r = m$, giving dimension $n - m$.',
        'An affine set of dimension $k$ is: a single point (dimension 0), a line (dimension 1), a plane (dimension 2), or higher-dimensional flat. These are always "translated" versions of vector subspaces — they don\'t have to pass through the origin.',
        'Concretely: the general solution is a **particular solution** (one specific solution) plus **any** solution to the homogeneous system (which forms a subspace). This is the affine structure.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 1.8',
          title: 'Affine Set',
          content: 'A subset $S \\subseteq \\mathbb{R}^n$ is an **affine set** (or flat) if there exists a subspace $V \\subseteq \\mathbb{R}^n$ and a point $\\mathbf{p}$ such that $$S = \\mathbf{p} + V := \\{\\mathbf{p} + \\mathbf{v} : \\mathbf{v} \\in V\\}$$ The **dimension** of $S$ equals the dimension of $V$.',
        },
        {
          type: 'theorem',
          label: 'Theorem 1.8',
          title: 'Solution Sets are Affine',
          content: 'Let $\\mathbf{x}_p$ be a particular solution to $A\\mathbf{x} = \\mathbf{b}$, and let $V = \\{\\mathbf{x} : A\\mathbf{x} = \\mathbf{0}\\}$ be the null space. Then the solution set is the affine set $$\\{\\mathbf{x}_p + \\mathbf{v} : \\mathbf{v} \\in V\\}$$ Its dimension equals the number of free variables = $n - \\text{rank}(A)$.',
        },
      ],
      whyItMatters: {
        context: 'The structure of solution sets is not arbitrary — it is always a flat, shift of a subspace.',
        applications: [
          'Image deblurring: the solution set being affine means we can parameterize all possible deblurred images',
          'In control theory, the set of feasible control inputs often forms an affine set',
          'Affine structure enables efficient sampling from solution sets in Monte Carlo methods',
        ],
      },
      resources: [
        {
          title: 'Null space and column space',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=uQhTuRlWMxw',
          durationMinutes: 10,
          description: 'Understanding the structure of solution sets geometrically.',
        },
      ],
      quiz: [
        {
          id: '1-8-q1',
          type: 'multiple-choice',
          question: 'A consistent system with $n = 4$ unknowns and rank $r = 3$ has solution set of dimension:',
          options: ['4', '3', '1', '0'],
          correctAnswer: 2,
          explanation: 'Dimension = $n - r = 4 - 3 = 1$. The solution set is a line (1-dimensional affine set).',
        },
        {
          id: '1-8-q2',
          type: 'true-false',
          question: 'The solution set of a consistent linear system always passes through the origin.',
          correctAnswer: false,
          explanation: 'The solution set is an *affine* set — it passes through the origin only if $\\mathbf{b} = \\mathbf{0}$ (the homogeneous case).',
        },
      ],
      commonMistakes: [
        'Thinking the expected dimension $n - m$ always holds — exceptional cases (redundant or contradictory equations) change this.',
        'Confusing the solution set (an affine set) with the null space (a subspace). They are related but distinct.',
      ],
    },
    {
      id: '1-9',
      chapterId: '1',
      sectionNumber: '1.9',
      title: 'Three Variables and Plane Geometry',
      estimatedMinutes: 12,
      plainEnglish: [
        'When we extend to three variables, the geometry changes dimension. A single linear equation $a_1 x_1 + a_2 x_2 + a_3 x_3 = b$ in $\\mathbb{R}^3$ defines a **plane** rather than a line.',
        'A system of equations in three variables asks: where do multiple planes intersect? Two generic planes in $\\mathbb{R}^3$ intersect along a **line** (one-dimensional). Three generic planes intersect at a **single point** (zero-dimensional, unique solution).',
        'But exceptional configurations abound in 3D. Three planes might: all share a common line, form a "prism" with no common point, or two might be parallel. The richness of 3D geometry foreshadows the full theory of linear systems.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 1.9',
          title: 'Plane Intersections',
          content: 'For a system of $m$ equations in $n = 3$ unknowns with rank $r$, the solution set has dimension $3 - r$: \\begin{itemize} \\item $r = 3$: unique point (0-dimensional) \\item $r = 2$: line (1-dimensional) \\item $r = 1$: plane (2-dimensional) \\item $r = 0$: all of $\\mathbb{R}^3$ (3-dimensional, only if $\\mathbf{b} = 0$) \\end{itemize} The system is inconsistent if elimination produces $0 = c$ with $c \\neq 0$.',
        },
      ],
      diagram: {
        type: 'PlaneVisualization3D',
        props: {
          planes: [
            { normal: [1, 0, 0], constant: 1, color: '#3B82F6', label: 'x = 1' },
            { normal: [0, 1, 0], constant: 1, color: '#10B981', label: 'y = 1' },
            { normal: [0, 0, 1], constant: 1, color: '#F59E0B', label: 'z = 1' },
          ],
          title: 'Three planes meeting at a point',
        },
      },
      whyItMatters: {
        context: '3D systems model three-dimensional physical reality: forces, positions, flows.',
        applications: [
          'Structural engineering: three force equilibrium equations at a joint determine the unique force state',
          '3D navigation: three GPS satellite distance equations locate a receiver in space',
          'Computer graphics: ray-plane intersection is a 3D linear system solved millions of times per frame',
        ],
      },
      resources: [
        {
          title: '3D linear algebra',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=PFDu9oVAE-g',
          durationMinutes: 11,
          description: 'Linear transformations in three dimensions.',
        },
        {
          title: 'Three equations, three unknowns',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=qgnW9YFarEk',
          durationMinutes: 15,
          description: 'Solving 3×3 linear systems step by step.',
        },
      ],
      quiz: [
        {
          id: '1-9-q1',
          type: 'multiple-choice',
          question: 'Two distinct, non-parallel planes in $\\mathbb{R}^3$ intersect in:',
          options: ['A point', 'A line', 'A plane', 'They cannot intersect'],
          correctAnswer: 1,
          explanation: 'Two distinct non-parallel planes always intersect in exactly a line — a 1-dimensional affine set.',
        },
      ],
      commonMistakes: [
        'Assuming three planes always meet at a point — they can form a "prism" with no common intersection.',
        'Forgetting that two planes can be parallel, giving no intersection at all.',
      ],
    },
    {
      id: '1-10',
      chapterId: '1',
      sectionNumber: '1.10',
      title: 'Normals and Geometric Insight in 3D',
      estimatedMinutes: 10,
      plainEnglish: [
        'Every plane in $\\mathbb{R}^3$ has a **normal vector** — a vector perpendicular to the plane. For the plane $a_1 x_1 + a_2 x_2 + a_3 x_3 = b$, the normal vector is exactly $(a_1, a_2, a_3)$ — the coefficient vector.',
        'This is a beautiful fact: the coefficients of a linear equation encode the geometric direction perpendicular to its solution set. Two planes are parallel exactly when their normals are parallel (proportional). Two planes are perpendicular exactly when their normals are perpendicular (dot product = 0).',
        'In exceptional cases — like three planes sharing a line or forming a prism — the normal vectors exhibit a special property: they lie in a common plane (they are **coplanar**). This is the geometric signature of linear dependence among the equations.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 1.10',
          title: 'Normal Vector',
          content: 'The **normal vector** to the plane $a_1 x_1 + a_2 x_2 + a_3 x_3 = b$ is $\\mathbf{n} = (a_1, a_2, a_3)$. It is perpendicular to every vector lying in the plane.',
        },
        {
          type: 'theorem',
          label: 'Theorem 1.10',
          title: 'Exceptional Cases and Coplanar Normals',
          content: 'For a system of three equations in three unknowns, exceptional behavior (no unique solution) occurs when the normal vectors $\\mathbf{n}_1, \\mathbf{n}_2, \\mathbf{n}_3$ are **linearly dependent** — they lie in a common plane through the origin (or one is a combination of the others).',
        },
      ],
      whyItMatters: {
        context: 'Normal vectors give geometric meaning to the coefficient vectors — making abstract algebra visible.',
        applications: [
          'In 3D graphics, surface normals determine how light reflects off objects',
          'In physics, the equation of a force constraint is often naturally stated via its normal direction',
          'In machine learning, the normal to a hyperplane classifier is the weight vector of the model',
        ],
      },
      resources: [
        {
          title: 'Normal vectors to planes',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=zGciyMwBvSc',
          durationMinutes: 11,
          description: 'How to find and use normal vectors of planes.',
        },
      ],
      quiz: [
        {
          id: '1-10-q1',
          type: 'multiple-choice',
          question: 'What is the normal vector to the plane $2x_1 - 3x_2 + x_3 = 5$?',
          options: ['$(5, 5, 5)$', '$(2, -3, 1)$', '$(-2, 3, -1)$', '$(1, 0, 0)$'],
          correctAnswer: 1,
          explanation: 'The normal vector is always the coefficient vector: $(a_1, a_2, a_3) = (2, -3, 1)$.',
        },
        {
          id: '1-10-q2',
          type: 'true-false',
          question: 'Two planes with proportional normal vectors must be parallel.',
          correctAnswer: true,
          explanation: 'If $\\mathbf{n}_2 = k\\mathbf{n}_1$, the planes have the same orientation and are either identical or parallel.',
        },
      ],
      commonMistakes: [
        'Confusing the normal vector $(a_1, a_2, a_3)$ with a vector in the plane — they are perpendicular to each other.',
        'Thinking "exceptional" means "error" — it means the geometry has a special, non-generic structure.',
      ],
    },
    {
      id: '1-11',
      chapterId: '1',
      sectionNumber: '1.11',
      title: 'Applications: Measurement, Laws, and Models',
      estimatedMinutes: 10,
      plainEnglish: [
        'Linear systems appear across science and engineering whenever we must find unknown quantities subject to constraints. Here we explore three concrete examples.',
        '**Chemical balancing:** To balance $\\text{CH}_4 + \\text{O}_2 \\to \\text{CO}_2 + \\text{H}_2\\text{O}$, we require the number of atoms of each element to be equal on both sides. Each element gives a linear equation in the unknown molecule counts.',
        '**Model fitting:** Given data points, finding the coefficients of a polynomial or linear model that fits them best is a linear system problem. For example, fitting a line to $(x_i, y_i)$ pairs means solving $ax_i + b = y_i$ for $a$ and $b$.',
        '**CT scan reconstruction:** Each X-ray beam through the body gives one linear equation relating the densities of tissues along its path. With thousands of beams, the system of equations can reconstruct a 2D slice.',
      ],
      formalView: [
        {
          type: 'example',
          label: 'Example 1.11',
          title: 'Chemical Balancing',
          content: 'To balance $x_1 \\text{CH}_4 + x_2 \\text{O}_2 \\to x_3 \\text{CO}_2 + x_4 \\text{H}_2\\text{O}$, conservation of atoms gives: \\begin{align*} \\text{C:}\\quad & x_1 = x_3 \\\\ \\text{H:}\\quad & 4x_1 = 2x_4 \\\\ \\text{O:}\\quad & 2x_2 = 2x_3 + x_4 \\end{align*} Setting $x_1 = 1$ and solving gives $(1, 2, 1, 2)$: $\\text{CH}_4 + 2\\text{O}_2 \\to \\text{CO}_2 + 2\\text{H}_2\\text{O}$.',
        },
      ],
      whyItMatters: {
        context: 'Linear systems are the mathematical language of constraints — they arise everywhere something must balance or sum to a target.',
        applications: [
          'Medical imaging (CT, MRI) reconstructs internal structure by solving large linear systems',
          'Structural analysis computes forces in beams and trusses via equilibrium equations',
          'Economics finds equilibrium prices by solving supply-demand linear systems',
          'Machine learning fits linear models by solving or minimizing systems of linear equations',
        ],
      },
      resources: [
        {
          title: 'Balancing chemical equations',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=RnGe3uTJEuQ',
          durationMinutes: 12,
          description: 'Balancing equations using linear algebra.',
        },
      ],
      quiz: [
        {
          id: '1-11-q1',
          type: 'true-false',
          question: 'Fitting a line $y = ax + b$ to three data points is always a linear system.',
          correctAnswer: true,
          explanation: 'Each data point $(x_i, y_i)$ gives the equation $ax_i + b = y_i$, which is linear in the unknowns $a$ and $b$.',
        },
      ],
      commonMistakes: [
        'Assuming applications are always "nice" — real systems often have no solution or infinitely many (fitting exactly vs. overdetermined).',
      ],
    },
    {
      id: '1-12',
      chapterId: '1',
      sectionNumber: '1.12',
      title: 'Echelon Form and Basic/Free Variables',
      estimatedMinutes: 14,
      plainEnglish: [
        'To solve a linear system systematically, we transform it into **echelon form** — a staircase shape where each equation\'s leading nonzero term is strictly to the right of the leading term of the equation above.',
        'Once in echelon form, we can identify two types of variables: **basic variables** (also called pivot or leading variables) are those that appear as the leading term of some equation. **Free variables** are all others — they can take any value.',
        'The dimension of the solution set equals the number of free variables. If there are $f$ free variables, the solution set is $f$-dimensional. We express each basic variable in terms of the free variables.',
        'Reading off the solution from echelon form is the job of **back substitution** — working from the last equation upward, substituting the already-solved variables into earlier equations.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 1.12',
          title: 'Echelon Form',
          content: 'A matrix (or system of equations) is in **echelon form** (row echelon form) if: \\begin{itemize} \\item All zero rows are at the bottom. \\item The leading nonzero entry (pivot) of each nonzero row is strictly to the right of the pivot of the row above. \\end{itemize}',
        },
        {
          type: 'definition',
          label: 'Definition 1.12b',
          title: 'Basic and Free Variables',
          content: 'In echelon form, a **basic variable** (pivot variable) corresponds to a column containing a pivot. A **free variable** corresponds to a non-pivot column. The solution set has dimension = (number of free variables).',
        },
      ],
      diagram: {
        type: 'BackSubstitutionAnimator',
        props: {
          augmentedMatrix: [
            [1, 2, -1, 3],
            [0, 1, 2, 1],
            [0, 0, 1, -1],
          ],
          basicVars: [0, 1, 2],
          freeVars: [],
          solution: ['x_3 = -1', 'x_2 = 1 - 2(-1) = 3', 'x_1 = 3 - 2(3) + (-1) = -4'],
        },
      },
      whyItMatters: {
        context: 'Echelon form is the canonical simplified form for linear systems — all solution information is readable from it.',
        applications: [
          'Every linear algebra software package reduces to echelon form internally',
          'The number of free variables directly counts the degrees of freedom in engineering designs',
          'Pivot positions identify which measurements constrain a system and which are redundant',
        ],
      },
      resources: [
        {
          title: 'Row echelon form and reduced row echelon form',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=L0CmbneYETs',
          durationMinutes: 14,
          description: 'Understanding pivot positions, basic variables, and free variables.',
        },
        {
          title: 'Solving linear systems: back substitution',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=QVKj3LADCnA',
          durationMinutes: 47,
          description: 'Back substitution from echelon form explained carefully.',
        },
      ],
      quiz: [
        {
          id: '1-12-q1',
          type: 'multiple-choice',
          question: 'A system in echelon form has 4 unknowns and 2 pivot columns. How many free variables are there?',
          options: ['2', '4', '6', '1'],
          correctAnswer: 0,
          explanation: 'Free variables = (total unknowns) − (pivots) = 4 − 2 = 2. These two free variables can take any value.',
        },
        {
          id: '1-12-q2',
          type: 'true-false',
          question: 'A system can have basic variables but no free variables, resulting in a unique solution.',
          correctAnswer: true,
          explanation: 'When every unknown is a basic variable (no free variables), there is a unique solution. This happens when rank equals the number of unknowns.',
        },
      ],
      commonMistakes: [
        'Thinking free variables are "unknown" — they are free to be anything; we parameterize by them.',
        'Confusing echelon form (staircase shape) with reduced echelon form (which also zeros entries above each pivot).',
        'Forgetting to count zero rows as having no pivot — they reduce the effective number of constraints.',
      ],
    },
    {
      id: '1-13',
      chapterId: '1',
      sectionNumber: '1.13',
      title: 'Gaussian Elimination',
      estimatedMinutes: 16,
      plainEnglish: [
        '**Gaussian elimination** is the fundamental algorithm for solving linear systems. It transforms any system into echelon form through a sequence of three types of row operations, each preserving the solution set.',
        '**Row Operation 1 (Permute):** Swap two rows. Reordering equations doesn\'t change which tuples satisfy all of them.',
        '**Row Operation 2 (Scale):** Multiply a row by a nonzero constant. We showed this preserves solutions in Section 1.3.',
        '**Row Operation 3 (Combine):** Replace one row by itself plus a scalar multiple of another row. This is the key elimination step — used to zero out entries below a pivot.',
        'The algorithm works column by column. Find a pivot in the current column, move it to the top (using permutation if needed), then eliminate all entries below it. Move to the next column and repeat.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 1.13',
          title: 'Row Operations Preserve Solutions',
          content: 'The following three row operations produce an equivalent system (same solution set): \\begin{enumerate} \\item \\textbf{Permute:} Swap equations $i$ and $j$. \\item \\textbf{Scale:} Replace equation $i$ by $k$ times equation $i$, for $k \\neq 0$. \\item \\textbf{Combine:} Replace equation $i$ by equation $i$ plus $k$ times equation $j$ (for $j \\neq i$). \\end{enumerate}',
        },
        {
          type: 'remark',
          label: 'Remark 1.13',
          title: 'Complexity',
          content: 'Gaussian elimination on an $m \\times n$ system requires $O(mn^2)$ arithmetic operations. For a square $n \\times n$ system, this is $O(n^3)$.',
        },
      ],
      diagram: {
        type: 'GaussianEliminationAnimator',
        props: {
          matrix: [
            [2, 1, -1],
            [-3, -1, 2],
            [-2, 1, 2],
          ],
          rhs: [8, -11, -3],
        },
      },
      whyItMatters: {
        context: 'Gaussian elimination is the most widely used algorithm in scientific computing — directly or as a building block.',
        applications: [
          'MATLAB\'s backslash operator (x = A\\b) uses Gaussian elimination with partial pivoting',
          'Finite element simulation of physical systems uses elimination to solve millions of equations',
          'Cryptography and coding theory rely on elimination over finite fields',
          'Every linear algebra library (LAPACK, Eigen, NumPy) implements variants of Gaussian elimination',
        ],
      },
      resources: [
        {
          title: 'Gaussian elimination',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=QVKj3LADCnA',
          durationMinutes: 47,
          description: 'The complete story of Gaussian elimination from Gilbert Strang.',
        },
        {
          title: 'Row reduction (Gaussian elimination)',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=2j5Ic2V7wq4',
          durationMinutes: 13,
          description: 'Step-by-step Gaussian elimination examples.',
        },
      ],
      quiz: [
        {
          id: '1-13-q1',
          type: 'multiple-choice',
          question: 'Which row operation is used to create zeros below a pivot in Gaussian elimination?',
          options: ['Swap two rows', 'Multiply a row by a nonzero scalar', 'Add a multiple of one row to another', 'Delete a row'],
          correctAnswer: 2,
          explanation: 'Adding a suitable multiple of the pivot row to another row zeroes out the entry in the pivot column — the core elimination step.',
        },
        {
          id: '1-13-q2',
          type: 'true-false',
          question: 'Gaussian elimination always produces a unique solution.',
          correctAnswer: false,
          explanation: 'Gaussian elimination reveals the solution structure. It may produce no solution, a unique solution, or infinitely many, depending on the system.',
        },
      ],
      commonMistakes: [
        'Performing row operations on only the coefficient matrix, forgetting to update the right-hand side.',
        'Using the wrong row as the pivot row — always use a row with a nonzero entry in the pivot column.',
        'Confusing row operations (legal) with column operations (change the problem!) in elimination.',
      ],
    },
    {
      id: '1-14',
      chapterId: '1',
      sectionNumber: '1.14',
      title: 'Matrix Formulation and Forward Look',
      estimatedMinutes: 10,
      plainEnglish: [
        'A linear system of $m$ equations in $n$ unknowns can be compactly written as $A\\mathbf{x} = \\mathbf{b}$, where $A$ is an $m \\times n$ **matrix** (the coefficient matrix), $\\mathbf{x}$ is a column vector of unknowns, and $\\mathbf{b}$ is the right-hand side vector.',
        'Gaussian elimination corresponds to multiplying $A$ on the left by **elementary matrices** — one for each row operation. The sequence of operations can be packaged into an **LU decomposition**: $A = LU$, where $L$ is lower triangular and $U$ is upper triangular (echelon form).',
        'This matrix perspective opens the door to the deep theory of linear algebra: column spaces, null spaces, rank, invertibility. We\'ve been doing linear algebra all along — now we have the language to say it precisely.',
        'In upcoming chapters we will study: vectors and linear combinations, the geometry of column and null spaces, rank and nullity, matrix multiplication, and invertibility. Everything connects back to the solution structure we\'ve seen here.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 1.14',
          title: 'Matrix Form',
          content: 'A linear system $\\sum_j a_{ij} x_j = b_i$ for $i = 1, \\ldots, m$ is equivalently written as $$A\\mathbf{x} = \\mathbf{b}$$ where $A = (a_{ij})$ is an $m \\times n$ matrix, $\\mathbf{x} = (x_1, \\ldots, x_n)^T$, and $\\mathbf{b} = (b_1, \\ldots, b_m)^T$.',
        },
        {
          type: 'remark',
          label: 'Remark 1.14',
          title: 'LU Decomposition Preview',
          content: 'Gaussian elimination factors $A = PA^{-1}LU$ where $P$ is a permutation matrix, $L$ is unit lower triangular (from the elimination multipliers), and $U$ is upper triangular (the echelon form). This factorization allows solving $A\\mathbf{x} = \\mathbf{b}$ in $O(n^2)$ after $O(n^3)$ preprocessing.',
        },
      ],
      whyItMatters: {
        context: 'Matrix notation is the compact language that unlocks all of linear algebra\'s power.',
        applications: [
          'Scientific computing uses matrix algebra for everything from weather simulation to genome analysis',
          'Deep learning represents neural networks as sequences of matrix multiplications',
          'Quantum mechanics uses matrix algebra (Hermitian operators, eigenvalues) as its mathematical language',
          'Computer graphics transforms scene geometry via 4×4 matrix multiplications per vertex',
        ],
      },
      resources: [
        {
          title: 'Matrices as linear transformations',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=kYB8IZa5AuE',
          durationMinutes: 10,
          description: 'The geometric meaning of matrices — the bridge to deep linear algebra.',
        },
        {
          title: 'Introduction to matrices',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=0oGJTQCy4cQ',
          durationMinutes: 12,
          description: 'Matrix notation, entries, and dimensions.',
        },
      ],
      quiz: [
        {
          id: '1-14-q1',
          type: 'multiple-choice',
          question: 'A linear system of 3 equations in 4 unknowns can be written as $A\\mathbf{x} = \\mathbf{b}$ where $A$ has size:',
          options: ['$4 \\times 3$', '$3 \\times 4$', '$3 \\times 3$', '$4 \\times 4$'],
          correctAnswer: 1,
          explanation: '$A$ has one row per equation ($m = 3$) and one column per unknown ($n = 4$): size $3 \\times 4$.',
        },
        {
          id: '1-14-q2',
          type: 'true-false',
          question: 'The matrix $A$ in $A\\mathbf{x} = \\mathbf{b}$ completely encodes all information about the linear system.',
          correctAnswer: false,
          explanation: 'The right-hand side $\\mathbf{b}$ also carries essential information. Without $\\mathbf{b}$, you only know the homogeneous system $A\\mathbf{x} = \\mathbf{0}$.',
        },
      ],
      commonMistakes: [
        'Writing $A$ with dimensions transposed — rows = equations ($m$), columns = unknowns ($n$).',
        'Forgetting that $A\\mathbf{x} = \\mathbf{b}$ is shorthand for the full system, not just one equation.',
      ],
    },
  ],
};

export default chapter1;
